import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma";

export async function GET() {
  const tasks = await getTask();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const { content } = await request.json();
  await prisma.task.create({
    data: {
        time_title: content.title,
        time_limit: new Date(content.limit),
        time_msg: new Date(content.msg),
        time_text: content.text,
        time_next: content.next,
        time_link: content.link,
    },
  });

  const tasks = await getTask();
  return NextResponse.json(tasks);
}

export async function PUT(request: NextRequest) {
  const { content } = await request.json();
  const id = parseInt(request.nextUrl.searchParams.get('id')!);
  const query = request.nextUrl.searchParams.get('query')!;
  switch(query){
    case 'title':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_title: content.title,
        },
      });
      break;
    case 'limit':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_limit: new Date(content.limit),
            time_msg: new Date(content.msg),
        },
      });
      break;
    case 'msg':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_msg: new Date(content.msg),
        },
      });
      break;
    case 'text':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_text: content.text,
        },
      });
      break;
    case 'next':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_next: content.next,
        },
      });
      break;
    case 'link':
      await prisma.task.update({
        where: {
          id: id,
        },
        data: {
            time_link: content.link,
        },
      });
      break;
  }
  const tasks = await getTask();
  return NextResponse.json(tasks);
}

export async function DELETE(request: NextRequest) {
  const id = parseInt(request.nextUrl.searchParams.get('id')!);

  await prisma.task.delete({
    where: {
      id: id,
    },
  });

  const tasks = await getTask();
  return NextResponse.json(tasks);
}

async function getTask() {
  const tasks = await prisma.task.findMany();
  return tasks;
}