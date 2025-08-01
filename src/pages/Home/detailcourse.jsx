import './detailcourse.css'
import { useState,useEffect ,useRef} from'react';
const Detail=({isShow, user, daycount,setIsShow})=>{
    const detailRef=useRef(null);
    const Wrapornot=(e)=>{
     
        if(isShow){
          if(detailRef.current.contains(e.target)){
          return;}else{
            setIsShow(false);
          }
    }
    }
    useEffect(()=>{
        if(isShow){
            window.addEventListener('mousedown',Wrapornot );  
        window.addEventListener('touchstart',Wrapornot ); 
        }
      return () => {
        window.removeEventListener('mousedown',Wrapornot );  
        window.removeEventListener('touchstart',Wrapornot );  };
    },[isShow])
    
  return (
<div className={`detailcontent ${isShow ? 'show' : ''}`}  ref={detailRef}>
          <div className='title'>
<div className='titlename'>
  {isShow?user.courseName:' '}
    </div>
  <div className='roomname'>
    <span className='room'> {isShow?user.room:' '} &gt; </span>
    <span className='name'>{isShow?user.teacherName:' '}</span>
    </div>  
    </div>
    <div className='oneinform'>
      <span className='range'>周期</span><span className='weektime'>{isShow?user.weektime:' '}</span>
      </div>  
      <div className='twoinform'>
      <span className='time'>时间</span>
      <span className='detialtime'>{isShow? `${daycount[user.weekday]} ${user.detailtime}` : ' '}</span>
      </div>
      <div className='threeinform'>
      <span className='type'>课程类型</span>
      <span className='detailtype'>{isShow?user.type:' '}</span>
      </div>
    </div>        
  )
}
export default Detail