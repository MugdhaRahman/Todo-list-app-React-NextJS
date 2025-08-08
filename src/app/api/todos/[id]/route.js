// // app/api/todos/[id]/route.js
// import { auth } from "@/auth";
// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";
//
// // PUT - Update a todo (toggle completion or edit text)
// export async function PUT(request, { params }) {
//     try {
//         const session = await auth();
//
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const { id } = params;
//         const body = await request.json();
//
//         // First, check if the todo belongs to the user
//         const { data: existingTodo, error: fetchError } = await supabase
//             .from('todos')
//             .select('*')
//             .eq('id', id)
//             .eq('user_id', session.user.id)
//             .single();
//
//         if (fetchError || !existingTodo) {
//             return NextResponse.json({ error: "Todo not found" }, { status: 404 });
//         }
//
//         // Update the todo
//         const { data: todo, error } = await supabase
//             .from('todos')
//             .update(body)
//             .eq('id', id)
//             .eq('user_id', session.user.id)
//             .select()
//             .single();
//
//         if (error) {
//             console.error('Supabase error:', error);
//             return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
//         }
//
//         return NextResponse.json(todo);
//     } catch (error) {
//         console.error('API error:', error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }
//
// // DELETE - Delete a todo
// export async function DELETE(request, { params }) {
//     try {
//         const session = await auth();
//
//         if (!session?.user?.id) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const { id } = params;
//
//         const { error } = await supabase
//             .from('todos')
//             .delete()
//             .eq('id', id)
//             .eq('user_id', session.user.id);
//
//         if (error) {
//             console.error('Supabase error:', error);
//             return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
//         }
//
//         return NextResponse.json({ message: "Todo deleted successfully" });
//     } catch (error) {
//         console.error('API error:', error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }