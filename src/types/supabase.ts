export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          price: number
          stock: number
          images: string[]
          seller_id: string
          category_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          price: number
          stock: number
          images: string[]
          seller_id: string
          category_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          price?: number
          stock?: number
          images?: string[]
          seller_id?: string
          category_id?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          parent_id: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          parent_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          parent_id?: string | null
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string
          status: 'active' | 'processing' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'active' | 'processing' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'active' | 'processing' | 'completed'
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          cart_id: string
          status: 'pending' | 'paid' | 'shipped' | 'delivered'
          payment_id: string | null
          shipping_address: string
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cart_id: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered'
          payment_id?: string | null
          shipping_address: string
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cart_id?: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered'
          payment_id?: string | null
          shipping_address?: string
          total?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at?: string
          updated_at: string
          name: string
          username: string
          phone: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at: string
          name: string
          username: string
          phone: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          username?: string
          phone?: string
        }
      }
      profiles2: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
