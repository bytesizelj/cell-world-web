import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cellworld');
    
    const orders = await db
      .collection('valentine_orders')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const client = await clientPromise;
    const db = client.db('cellworld');
    
    // Get current count
    const count = await db.collection('valentine_orders').countDocuments();
    const orderNumber = count + 1;
    
    const order = {
      ...body,
      orderNumber,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    await db.collection('valentine_orders').insertOne(order);
    
    return NextResponse.json({ success: true, orderNumber, order });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}