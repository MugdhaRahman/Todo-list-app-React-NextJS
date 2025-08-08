// // app/api/todos/route.js
// import { auth } from "@/auth";
// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";
//
// // GET - Fetch all todos for the authenticated user
// export async function GET() {
//     try {
//         const session = await auth();
//
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const { data: todos, error } = await supabase
//             .from('todos')
//             .select('*')
//             .eq('user_id', session.user.id)
//             .order('created_at', { ascending: false });
//
//         if (error) {
//             console.error('Supabase error:', error);
//             return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
//         }
//
//         return NextResponse.json(todos);
//     } catch (error) {
//         console.error('API error:', error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }
//
// // POST - Create a new todo
// export async function POST(request) {
//     try {
//         const session = await auth();
//
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const { text } = await request.json();
//
//         if (!text || text.trim() === '') {
//             return NextResponse.json({ error: "Todo text is required" }, { status: 400 });
//         }
//
//         const { data: todo, error } = await supabase
//             .from('todos')
//             .insert([
//                 {
//                     user_id: session.user.id,
//                     text: text.trim(),
//                     completed: false
//                 }
//             ])
//             .select()
//             .single();
//
//         if (error) {
//             console.error('Supabase error:', error);
//             return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
//         }
//
//         return NextResponse.json(todo);
//     } catch (error) {
//         console.error('API error:', error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }