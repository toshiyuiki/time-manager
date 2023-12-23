'use client';

import Day from "../components/day";
import { useState, useEffect } from 'react';

interface DataType {
  id:number;
  title: string;
  limit: string;
  msg: string;
  next: string;
  link: string;
  text: string;
}

export default function Home() {

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/db');
      const tasks = await response.json();
      setDataSource(tasks);
    };
    fetchTasks();
  }, []);

  dataSource.sort((a:any,b:any) => {
    if( a.time_limit < b.time_limit ) return -1;
    if( a.time_limit > b.time_limit ) return 1;
    return 0;
  })

  //DELETE
  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/db?id=${id}`, {
      method: 'DELETE',
    });

    const tasks = await response.json();
    setDataSource(tasks);
  };

  //PUT
  const handleUpdate = async (event:any, id: number, query:string, limit:string, next:string) => {
    event.preventDefault();
    const limit_date = new Date(limit);
    const result_time = {
      limit:'',
      msg:'',
    }
    const next_sum = (limit_tmp:any) => {
      result_time.limit = limit_tmp.toLocaleDateString().toString();
      const msg_temp = new Date(result_time.limit);
      msg_temp.setDate(limit_tmp.getDate() - 7);
      result_time.msg = msg_temp.toLocaleDateString().toString();
      return result_time;
    }
    const next_month = async (num:number,limit_tmp:Date) => {
      limit_tmp.setMonth(limit_tmp.getMonth() + num);
      await next_sum(limit_tmp);
    }
    const next_year = async (num:number,limit_tmp:any) => {
      limit_tmp.setFullYear(limit_tmp.getFullYear() + num);
      await next_sum(limit_tmp);
    }
    switch(next){
      case '1ヵ月':
        await next_month(1,limit_date);
        break;
      case '2ヵ月':
        await next_month(2,limit_date);
        break;
      case '3ヵ月':
        await next_month(3,limit_date);
        break;
      case '4ヵ月':
        await next_month(4,limit_date);
        break;
      case '5ヵ月':
        await next_month(5,limit_date);
        break;
      case '6ヵ月':
        await next_month(6,limit_date);
        break;
      case '7ヵ月':
        await next_month(7,limit_date);
        break;
      case '8ヵ月':
        await next_month(8,limit_date);
        break;
      case '9ヵ月':
        await next_month(9,limit_date);
        break;
      case '10ヵ月':
        await next_month(10,limit_date);
        break;
      case '11ヵ月':
        await next_month(11,limit_date);
        break;
      case '1年':
        await next_year(1,limit_date);
        break;
      case '2年':
        await next_year(2,limit_date);
        break;
      case '3年':
        await next_year(3,limit_date);
        break;
      default:
        alert('更新期間が不正です。')
        break;
    }
    const content = {
      limit:result_time.limit,
      msg:result_time.msg
    }

    const response = await fetch(`/api/db?id=${id}&query=${query}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const tasks = await response.json();
    setDataSource(tasks);

  };
  const limittask = (msg:string,ele:string) => {
    const now_time = new Date();
    const time_limit = new Date(msg);
    let add_style = '';
    if(now_time >= time_limit){
      switch(ele){
        case 'btn':
          add_style = 'bg-red-400';
          break;
        case 'body':
          add_style = 'bg-red-100';
          break;
        default:
          break;
      }
      return add_style;
    }else{
      switch(ele){
        case 'btn':
          add_style = 'bg-teal-200';
          break;
        case 'body':
          add_style = 'bg-gray-50';
          break;
        default:
          break;
      }
      return add_style;
    }
  }
  return (
    <main className="min-h-screen">
      <section>
        <div className="p-5">
          <h1 className="border-b-2 border-gray-200 pb-4 mb-4">
            タスク確認
          </h1>
          <ul className="flex jusity-start items-start gap-x-5 gap-y-10 flex-wrap">
            {dataSource.map((val:any) => {
                return <li className={limittask(val.time_msg,'body') + " p-5 rounded-md shadow-md w-1/4 relative"}>
                <div className="bg-gray-100 w-3/4 py-1 px-2 mb-2">
                  {val.time_title}
                </div>
                <button className="absolute top-1 right-1 bg-gray-500 text-yellow-300 rounded-md py-1 px-2" onClick={() => handleDelete(val.id)}>DEL</button>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">期限</dt>
                    <dd><Day dateset={val.time_limit} /></dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">連絡日</dt>
                    <dd><Day dateset={val.time_msg} /></dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">更新期間</dt>
                    <dd>{val.time_next}</dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">備考</dt>
                    <dd>{val.time_text}</dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">URL</dt>
                    <dd><a className="text-blue-600" href="">{val.time_link}</a></dd>
                  </dl>
                </div>
                <form onSubmit={(e) => handleUpdate(e,val.id,'limit',val.time_limit,val.time_next)}>
                  <div className="pt-6 pb-2">
                    <button className={limittask(val.time_msg,'btn') + " block w-1/2 m-auto text-center py-4 rounded-md"}>UPDATE</button>
                  </div>
                </form>
              </li>
              })}
          </ul>
        </div>
      </section>
    </main>
  )
}
