'use client';

import Day from "../components/day";
import { useState, useEffect, ChangeEvent } from 'react';

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
  let set_propaty = {
    post:{
      title:'',
      limit:'',
      msg:'',
      next:'',
      link:'',
      text:''
    },
    edit:{
      title:[''],
      limit:[''],
      msg:[''],
      next:[''],
      link:[''],
      text:['']
    }
  }
  const [use_propaty, setPropaty] = useState({
    post:{
      title:'',
      limit:'',
      msg:'',
      next:'',
      link:'',
      text:''
    },
    edit:{
      title:[''],
      limit:[''],
      msg:[''],
      next:[''],
      link:[''],
      text:['']
    }
  });
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/db');
      const tasks = await response.json();
      setDataSource(tasks);
    };
    fetchTasks();
  }, []);

  const setUseState = () => {
    setPropaty(set_propaty);
  }

  //POST
  const handlePostInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, query:string) => {
    set_propaty.post = use_propaty.post;
    switch(query){
      case 'title':
        set_propaty.post.title = event.target.value
        break;
      case 'limit':
        set_propaty.post.limit = event.target.value
        const limit_for_msg = new Date(event.target.value);
        limit_for_msg.setDate(limit_for_msg.getDate() - 7);
        const msg = limit_for_msg.toLocaleDateString().toString();
        set_propaty.post.msg = msg;
        break;
      case 'msg':
        set_propaty.post.msg = event.target.value
        break;
      case 'next':
        set_propaty.post.next = event.target.value
        break;
      case 'text':
        set_propaty.post.text = event.target.value
        break;
      case 'link':
        set_propaty.post.link = event.target.value
        break;
    }
    setUseState();
  }

  const handlePost = async (event:any) => {
    event.preventDefault();
    const content = {
      title:use_propaty.post.title,
      limit:use_propaty.post.limit,
      msg:use_propaty.post.msg,
      next:use_propaty.post.next,
      text:use_propaty.post.text,
      link:use_propaty.post.link
    }
    const response = await fetch('/api/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const tasks = await response.json();
    setDataSource(tasks);
  };

  //Edit
  const handleEditInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, id:number, query:string) => {
    set_propaty.edit = use_propaty.edit;
    switch(query){
      case 'title':
        set_propaty.edit.title[id] = event.target.value
        break;
      case 'limit':
        set_propaty.edit.limit[id] = event.target.value
        const limit_for_msg = new Date(event.target.value);
        limit_for_msg.setDate(limit_for_msg.getDate() - 7);
        const msg = limit_for_msg.toLocaleDateString().toString();
        set_propaty.edit.msg[id] = msg;
        break;
      case 'msg':
        set_propaty.edit.msg[id] = event.target.value
        break;
      case 'next':
        set_propaty.edit.next[id] = event.target.value
        break;
      case 'text':
        set_propaty.edit.text[id] = event.target.value
        break;
      case 'link':
        set_propaty.edit.link[id] = event.target.value
        break;
    }
    setUseState();
  }

  const handleEdit = async (event:any, id: number, query:string) => {
    event.preventDefault();
    const content = {
      title:use_propaty.edit.title[id],
      limit:use_propaty.edit.limit[id],
      msg:use_propaty.edit.msg[id],
      next:use_propaty.edit.next[id],
      text:use_propaty.edit.text[id],
      link:use_propaty.edit.link[id]
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

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/db?id=${id}`, {
      method: 'DELETE',
    });

    const tasks = await response.json();
    setDataSource(tasks);
  };

  return (
    <div>
      <section className="p-6">
        <h2 className="border-b-2 border-gray-200 pb-4 mb-4">タスク追加</h2>
        <form onSubmit={handlePost}>
          <div className="p-5 bg-yellow-50 rounded-md shadow-md w-1/4 relative">
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">タイトル</dt>
                <dd>
                <input className="w-96 block box-border p-2" type="text" name="title" value={use_propaty.post.title} onChange={(e) => handlePostInput(e,'title')} />
                </dd>
              </dl>
            </div>
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">期限</dt>
                <dd>
                  <input className="w-96 block box-border p-2" type="text" name="limit" value={use_propaty.post.limit} onChange={(e) => handlePostInput(e,'limit')} />
                </dd>
              </dl>
            </div>
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">連絡日※期限の7日前</dt>
                <dd><Day dateset={use_propaty.post.msg} /></dd>
              </dl>
            </div>
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">更新期間</dt>
                <dd>
                  <select className="p-2" name="next" value={use_propaty.post.next} onChange={(e) => handlePostInput(e, 'next')}>
                    <option>選択してください</option>
                    <option value="1ヵ月">1ヵ月</option>
                    <option value="2ヵ月">2ヵ月</option>
                    <option value="3ヵ月">3ヵ月</option>
                    <option value="4ヵ月">4ヵ月</option>
                    <option value="5ヵ月">5ヵ月</option>
                    <option value="6ヵ月">6ヵ月</option>
                    <option value="7ヵ月">7ヵ月</option>
                    <option value="8ヵ月">8ヵ月</option>
                    <option value="9ヵ月">9ヵ月</option>
                    <option value="10ヵ月">10ヵ月</option>
                    <option value="11ヵ月">11ヵ月</option>
                    <option value="1年">1年</option>
                    <option value="2年">2年</option>
                    <option value="3年">3年</option>
                  </select>
                </dd>
              </dl>
            </div>
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">備考</dt>
                <dd>
                  <input className="w-96 block box-border p-2" type="text" name="text" value={use_propaty.post.text} onChange={(e) => handlePostInput(e,'text')} />
                </dd>
              </dl>
            </div>
            <div className="py-2 border-solid border-b-2 border-gray-400">
              <dl>
                <dt className="text-xs text-gray-400 mb-1">URL</dt>
                <dd>
                  <input className="w-96 block box-border p-2" type="text" name="link" value={use_propaty.post.link} onChange={(e) => handlePostInput(e,'link')} />
                </dd>
              </dl>
            </div>
            <div className="pt-6 pb-2">
              <button type="submit" className="block border-box w-1/2 m-auto text-center py-4 bg-yellow-200 rounded-md">ADD</button>
            </div>
          </div>
        </form>
      </section>
      <section className="p-6">
        <h2 className="border-b-2 border-gray-200 pb-4 mb-4">タスク編集</h2>
        <ul className="flex jusity-start items-start gap-x-5 gap-y-10 flex-wrap">
          {dataSource.map((val:any) => {
            return <li className="p-5 bg-gray-50 rounded-md shadow-md w-1/4 relative">
              <button className="absolute top-1 right-1 bg-gray-500 text-yellow-300 rounded-md py-1 px-2" onClick={() => handleDelete(val.id)}>DEL</button>
                <div className="bg-gray-100 py-2 px-2 mb-2">
                <form onSubmit={(e) => {handleEdit(e,val.id,'title')}}>
                  <p className="py-1">{val.time_title}</p>
                  <div className="flex gap-x-2">
                    <input className="w-96 block box-border px-2" type="text" name="title" value={use_propaty.edit.title[val.id]} onChange={(e) => handleEditInput(e,val.id,'title')} />
                    <button className="text-center py-2 px-4 bg-teal-200 rounded-md" type="submit">Edit</button>
                  </div>
                </form>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">期限</dt>
                    <dd>
                      <form onSubmit={(e) => {handleEdit(e,val.id,'limit')}}>
                        <p className="py-1"><Day dateset={val.time_limit} /></p>
                        <div className="flex gap-x-2">
                          <input className="w-96 block box-border px-2" type="text" name="limit" value={use_propaty.edit.limit[val.id]} onChange={(e) => handleEditInput(e,val.id,'limit')} />
                          <button className="text-center py-2 px-4 bg-teal-200 rounded-md" type="submit">Edit</button>
                        </div>
                      </form>
                    </dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">連絡日※期限の7日前</dt>
                    <dd><Day dateset={val.time_msg} /></dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">更新期間</dt>
                    <dd>
                      <form onSubmit={(e) => {handleEdit(e,val.id,'next')}}>
                        <p className="py-1">{val.time_next}</p>
                        <div className="flex gap-x-2">
                          <select name="next" value={use_propaty.edit.next[val.id]} onChange={(e) => handleEditInput(e,val.id, 'next')}>
                            <option>選択してください</option>
                            <option value="1ヵ月">1ヵ月</option>
                            <option value="2ヵ月">2ヵ月</option>
                            <option value="3ヵ月">3ヵ月</option>
                            <option value="4ヵ月">4ヵ月</option>
                            <option value="5ヵ月">5ヵ月</option>
                            <option value="6ヵ月">6ヵ月</option>
                            <option value="7ヵ月">7ヵ月</option>
                            <option value="8ヵ月">8ヵ月</option>
                            <option value="9ヵ月">9ヵ月</option>
                            <option value="10ヵ月">10ヵ月</option>
                            <option value="11ヵ月">11ヵ月</option>
                            <option value="1年">1年</option>
                            <option value="2年">2年</option>
                            <option value="3年">3年</option>
                          </select>
                          <button className="text-center py-2 px-4 bg-teal-200 rounded-md" type="submit">Edit</button>
                        </div>
                      </form>  
                    </dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">備考</dt>
                    <dd>
                      <form onSubmit={(e) => {handleEdit(e,val.id,'text')}}>
                        <p className="py-1">{val.time_text}</p>
                        <div className="flex gap-x-2">
                          <input className="w-96 block box-border px-2" type="text" name="text" value={use_propaty.edit.text[val.id]} onChange={(e) => handleEditInput(e,val.id,'text')} />
                          <button className="text-center py-2 px-4 bg-teal-200 rounded-md" type="submit">Edit</button>
                        </div>
                      </form>
                    </dd>
                  </dl>
                </div>
                <div className="py-2 border-solid border-b-2 border-teal-400">
                  <dl>
                    <dt className="text-xs text-gray-400 mb-1">URL</dt>
                    <dd>
                      <form onSubmit={(e) => {handleEdit(e,val.id,'link')}}>
                        <p className="py-1"><a className="text-blue-600" href={val.time_link}>{val.time_link}</a></p>
                        <div className="flex gap-x-2">
                          <input className="w-96 block box-border px-2" type="text" name="link" value={use_propaty.edit.link[val.id]} onChange={(e) => handleEditInput(e,val.id,'link')} />
                          <button className="text-center py-2 px-4 bg-teal-200 rounded-md" type="submit">Edit</button>
                        </div>
                      </form>
                    </dd>
                  </dl>
                </div>
              </li>
            })}
          </ul>
      </section>
    </div>
  )
}
