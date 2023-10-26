import './Pagination.css'
import { useEffect, useRef } from 'react'

const Pagination = ({currentNum}) => {
  const PartRef = useRef();
  
  useEffect(() => {
    const arr = Array.from(PartRef.current.children);
    arr.map(item => {
      item.classList.remove('active');
    })
    arr[currentNum].classList.add('active');
  }, [currentNum]);

  return (
    <ul ref={PartRef} className='pagination'>
      <li className='active'>Разминка</li>
      <li>Воробьиные</li>
      <li>Лесные птицы</li>
      <li>Певчие птицы</li>
      <li>Хищные птицы</li>
      <li>Морские птицы</li>
    </ul>
  )
}

export default Pagination