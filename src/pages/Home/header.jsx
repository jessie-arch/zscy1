import { render } from "less"
import './header.css'
import {useState,useRef,useEffect, use} from 'react';
const Header=({ count, setCount, weekcount, Setweekie, backnow, weekie,startDate })=>{
  
  //计算日期
  //每天的日
    const [dailyDates, setDailyDates] = useState([]);
  //每周的月
  const [currentMonth, setCurrentMonth] = useState(null);
    //记录滑动的初始x坐标
  const initx=useRef(0);
  //防止过快滑动
   const lastSwipeTime = useRef(0);
     const swipeInterval = 500; // 滑动间隔时间（毫秒）
//判断是否进行了滑动
  const [isDrag,setIsDrag]=useState(false);
  //处理滑动
  //获取初始x坐标
  const handleStart=(e)=>{
  initx.current=e.touches?e.touches[0].clientX:e.clientX;
  setIsDrag(true);
}
const handleMove=(e)=>{
  if(!isDrag){
    return;
  }

  //获取当前x坐标
  const clientx = e.touches ? e.touches[0].clientX : e.clientX;
  const distance=clientx-initx.current;
    const currentTime = Date.now();
 if(currentTime - lastSwipeTime.current < swipeInterval) {
   return; // 防止过快滑动
 }
  if(distance <- 50){
  setCount(prevCount => {
    let newCount = prevCount + 1;
   if ( newCount >= weekcount.length) {
      newCount = 0;
    }
    Setweekie(weekcount[newCount]);
    lastSwipeTime.current = currentTime;
   
    return newCount;
  });
 } else if(distance >50){
  setCount(prevCount => {
    let newCount = prevCount - 1;
     if (newCount <0) {
      newCount = 0;
    
    }
    Setweekie(weekcount[newCount]);
    
    lastSwipeTime.current = currentTime;
    
    return newCount;
  });
 }
}
const handleEnd=()=>{
 
  setIsDrag(false);
}
//监听
useEffect(() => {
    const handleMouseDown = (e) => handleStart(e);
    const handleMouseMove = (e) => handleMove(e);
    const handleMouseUp = () => handleEnd();

    const handleTouchStart = (e) => handleStart(e);
    const handleTouchMove = (e) => handleMove(e);
    const handleTouchEnd = () => handleEnd();


    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      // 移除全局事件监听
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDrag, weekcount]);

//计算表头显示的日期
 useEffect(() => {
    if (count === 0) {
      setCurrentMonth(null);
      setDailyDates([]);
      return;
    }
    const baseDate = new Date(startDate.getTime());
    //计算周一,去掉整学期的索引
  baseDate.setDate(baseDate.getDate() + (count - 1) * 7);
    const weekStart = new Date(baseDate);
    //计算周一到周几的偏移量
const dayOfWeek = weekStart.getDay();
const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
weekStart.setDate(weekStart.getDate() + offset);//得到周一
    const dates = [];
    //记录日期的数组
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);//得到周一到周日的日期
      dates.push(date.getDate());//用数组存起来
    }
    // 取本周第一天的月份
    setCurrentMonth(weekStart.getMonth() + 1); 
    setDailyDates(dates);
  }, [count]);
   return(
   

 <div className="header">
      <div className='monthdiv num small'>
 {currentMonth ? `${currentMonth} 月` : ' '}
      </div>
     <div className='mondaydiv cell small'>
       <span className='commonweek'>周一</span>
        <span className='commonday'>{dailyDates[0] ? `${dailyDates[0]} 日` : ' '}</span>
     </div>
     <div className='tuesdaydiv cell small'>
       <span className='commonweek'>周二</span>
        <span className='commonday'>       {dailyDates[1] ? `${dailyDates[1]} 日` : ' '}</span>
     </div>
     <div className='wednesdaydiv cell small'>
       <span className='commonweek'>周三</span>
        <span className='commonday'> {dailyDates[2] ? `${dailyDates[2]} 日` : ' '}</span>
     </div>
     <div className='thursdaydiv cell small'>
       <span className='commonweek'>周四</span>
        <span className='commonday'>{dailyDates[3] ? `${dailyDates[3]} 日` : ''}</span>
     </div>
     <div className='fridaydiv cell small'>
       <span className='commonweek'>周五</span>
        <span className='commonday'>{dailyDates[4] ? `${dailyDates[4]} 日` : ' '}</span>
     </div>
     <div className='saturdaydiv cell small'>
       <span className='commonweek'>周六</span>
        <span className='commonday'>{dailyDates[5] ? `${dailyDates[5]} 日` : ' '}</span>
     </div>
     <div className='sundaydiv cell small'>
       <span className='commonweek'>周日</span>
        <span className='commonday'>{dailyDates[6] ? `${dailyDates[6]} 日` : ''}</span>
     </div>
</div>
   );
 }
    export default Header;