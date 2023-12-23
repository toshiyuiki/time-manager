import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma";

export async function GET() {
  const tasks = await getTask();
  const time_task = () => {
    const now_time = new Date();
    let limit_time = false;
    tasks.map((val:any) => {
      if(now_time > val.time_msg){
        limit_time = true;
      }
    });
    return limit_time;
  }
  const isLimit = time_task();
  if(isLimit){
    const apikey = process.env.CHATWORK_API;
    const link = "http://localhost:3000/manager";
    const room_id = process.env.CHATWORK_ROOM;
    const message = `【Time Manager】%0A期限日が７日以内のタスクがあります。%0A${link}`;
    const response = await fetch(`https://api.chatwork.com/v2/rooms/${room_id}/messages?self_unread=1&body=${message}`, {
      method:'POST',
      headers: {
        'X-Chatworktoken': apikey,
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
    });
  }
  return NextResponse.json(tasks);
}

async function getTask() {
  const tasks = await prisma.task.findMany();
  return tasks;
}