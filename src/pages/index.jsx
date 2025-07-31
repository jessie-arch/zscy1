import React,{ useState,useRef,useEffect } from 'react';
import './Home/index.css';
import AddCourse from './Home/addcourse.jsx';
import Content from './Home/content';
import Tapbar from './Home/tapbar';
const AllContent=()=>{

//管理添加课程弹窗的函数
  // 添加课程
  const selectRef = useRef(null);
  const [select, setSelect] = useState(null); // 存储选择的格子
  const [showdadd, setShowdadd] = useState(false); // 是否显示添加课程组件
  const [showmask, setShowmask] = useState(false); // 是否显示遮蔽层
  const weekcount = ['整学期','第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周','第二十一周'];
  const [weekie, Setweekie] = useState(weekcount[0]);
//表示自定义课程重新渲染
const[changecustom,setChangeCustom]=useState(null)
  const [count, setCount] = useState(0);
    const closeTimer = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false); 
//管理显示面板的函数
  const [isFullscreen, setIsFullscreen] = useState(false);
//存储初始y坐标的函数
const initY=useRef(0);
//绑定对应的ui元素
const triggerRef = useRef(null);
//标记是否被拖动
const [isDragging, setIsDragging] = useState(false);
//监听触摸
const handleTouchStart=(e)=>{
  //获取初始y坐标
  initY.current=e.touches?e.touches[0].clientY:e.clientY;
  setIsDragging(true)
}
const handleTouchMove=(e)=>{
  if(!isDragging){
    return;
  }

  //获取当前y坐标
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const distance=clientY-initY.current;
  //当没有显示并且距离小于-20时显示，当显示并且距离大于50时隐藏
  if(isFullscreen===false&&distance<-20){
    setIsFullscreen(true);
  }else if(isFullscreen===true&&distance>20){
    setIsFullscreen(false);
  }

}
const handleEnd=()=>{
  setIsDragging(false);
}
//监听鼠标
useEffect(()=>{
  const handleMouseMove = (e) => handleTouchMove(e);
    const handleMouseUp = () => handleEnd();
    

    if (triggerRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
    }

    return () => {
      //移除监听
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging,isFullscreen]);
  // 关闭遮蔽层
  useEffect(() => {
    const handleClose = (e) => {
      const selectedCell = document.querySelector(
        `.course-cell[data-row="${select?.row}"][data-col="${select?.col}"]`
      );

      if (showmask && selectedCell && !selectedCell.contains(e.target)) {
        setIsFadingOut(true); 
        closeTimer.current = setTimeout(() => {
          setShowmask(false);
          setShowdadd(false);
          setSelect(null);
          setIsFadingOut(false);
          closeTimer.current = null;
        }, 300);
      }
    };

    document.addEventListener('mousedown', handleClose, true);
    document.addEventListener('touchstart', handleClose, true);

    return () => {
      document.removeEventListener('mousedown', handleClose, true);
      document.removeEventListener('touchstart', handleClose, true);
    };
  }, [showmask, select]);
  return(
<div>
    {/* //当isFullscreen为true时,全屏显示 */}
    <div className='totalshow' style={{height: isFullscreen ? '95vh' : '15%'}}>
    
<div className='showbtn' ref={triggerRef}  
onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleEnd}
  onMouseDown={handleTouchStart}
  onMouseMove={handleTouchMove}
  onMouseUp={handleEnd}
   style={{ touchAction: 'none' }}>
    <div className='fakeui'/>
   </div>
  
  <div className='panel'    style={{  transform: isFullscreen ? 'translateY(0)' : 'translateY(calc(100% - 20px))',
     height: isFullscreen ? '95%' : '70%'
  }}>
       
    <Content style={{display:isFullscreen?'block':'none',
     height:'100%',
     width:'100%'
    }} showdadd={showdadd}
            setShowdadd={setShowdadd}
            select={select}
            setSelect={setSelect}
            selectRef={selectRef}
            showmask={showmask}
            setShowmask={setShowmask}
            isFadingOut={isFadingOut}
            weekie={ weekie}
             Setweekie={Setweekie}
            setIsFadingOut={setIsFadingOut}
            weekcount={weekcount}
            closeTimer ={closeTimer }
            count={count} 
            setCount={setCount}
            changecustom={changecustom}
            setChangeCustom={ setChangeCustom}
          />
</div>
   {/* 添加课程弹窗 */}
        {showdadd && <AddCourse  className="addcourse" setShowdadd={setShowdadd} 
              select={  select} count={count}  changecustom={changecustom}
  setChangeCustom={setChangeCustom}/>}
</div>
 <Tapbar isshow={!isFullscreen}/>
         </div>


  )
}
export default AllContent;