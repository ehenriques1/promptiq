import { NextRequest, NextResponse } from 'next/server'

// In a real app, you'd use a database to store usage data
// For now, we'll use a simple in-memory store (this resets on server restart)
const usageStore = new Map<string, { count: number; lastUsed: string }>()

function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback to a default
  return 'unknown'
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const usage = usageStore.get(ip) || { count: 0, lastUsed: '' }
    
    return NextResponse.json({
      canUseFree: usage.count === 0,
      usageCount: usage.count,
      lastUsed: usage.lastUsed
    })
  } catch (error) {
    console.error('Error checking usage:', error)
    return NextResponse.json(
      { error: 'Failed to check usage' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const currentUsage = usageStore.get(ip) || { count: 0, lastUsed: '' }
    
    const newUsage = {
      count: currentUsage.count + 1,
      lastUsed: new Date().toISOString()
    }
    
    usageStore.set(ip, newUsage)
    
    return NextResponse.json({
      success: true,
      usageCount: newUsage.count
    })
  } catch (error) {
    console.error('Error updating usage:', error)
    return NextResponse.json(
      { error: 'Failed to update usage' },
      { status: 500 }
    )
  }
} 