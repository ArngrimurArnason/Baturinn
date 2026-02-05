import cards from "@/app/api/db";
 
export async function GET() {
    return Response.json({cards})
} 