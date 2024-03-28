import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <span className='home_name' >
        <h1>
          <Link to="/">영단어</Link>
        </h1>
      </span>
      <span className='menu'>
          <Link to="/create_word" className='link'>
              단어 추가
          </Link>
          <Link to="/create_day" className='link'>
              Day 추가
          </Link>
          <Link to="/delete_day" className='link'>
              Day 삭제
          </Link>
      </span>
    </div>
  );
}
