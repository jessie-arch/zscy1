import './content.css';
import Detail from './detailcourse.jsx';
import Header from './header.jsx';
import img1 from '../../assets/mask.jpg';
import {getCourses, getCustom} from "../../mock/api.js"
import {useState,useRef,useEffect} from 'react';
import MockSchedule from "../../mock/schedulemock.js";

const Content = ({ style, 
  showdadd, 
  setShowdadd,
  select,
  setSelect,
  selectRef,
  showmask,
  setShowmask,
  isFadingOut,
  setIsFadingOut,
  weekie, 
  Setweekie,
  weekcount,
  closeTimer ,
  count,
  setCount,
  changecustom,
  setChangeCustom
 }) => {
  const startDate = new Date(2025,2,24); // 开学日期

const [custom,setCustom]= useState([]);
  const [course, setCourse] = useState([]);
  
  // 弹窗
  const daycount = ['周一','周二','周三','周四','周五','周六','周日']
  const [user, setUser] = useState(null);
  const [isShow, setIsShow] = useState(false);
  

   const closeui = useRef(null); // 绑定遮蔽层ui


  // 回到本周的函数
  const backnow = () => {
    // 设定的时间
    const settime = new Date(2025,4,20);
    const gaptime = settime - startDate;
    // 算天数
    const gapday = Math.floor(gaptime/(1000*60*60*24));
    // 算周数，不足一周算一周
    const day = gapday%7;
    const week = Math.ceil(gapday/7);
    
    if(week >= 22){
      Setweekie(weekcount[0]);
      setCount(0);
    } else {
      Setweekie(weekcount[week]);
      setCount(week);
    }
  }

  // 请求课程数据
  const fetchData = async () => {
    try {
      const response = await getCourses(); 
      const course = MockSchedule.course; // 课程数据
     
      return course;
    } catch (err) {
      console.error('请求课程数据失败:', err); 
      throw err; 
    }
  }

  // 渲染课程
  const renderCourse = (course) => {
    // 清空单元格
    document.querySelectorAll('.course-cell').forEach(cell => {
      cell.innerHTML = '';
      cell.style.display = '';
    });
    
    // 当前周有这个课程或者整学期页面
    course.forEach((item) => {
      const week = count;
      const flag = item.weekRange.includes(week);
      
      if(flag || count === 0){
        // 找到对应的单元格
        const rows = item.sectionStart;
        const col = item.weekday + 1;
        const end = 2;
        const heightValue = `${end * 100}%`;
        const cell = document.querySelector(`.course-cell[data-row="${rows}"][data-col="${col}"]`);
        
        if(cell){
          // 将课程的字两个两个显示
          const courseNameChunks = [];
          for (let i = 0; i < item.courseName.length; i += 2) {
            courseNameChunks.push(item.courseName.slice(i, i + 2));
          }
          const formattedCourseName = courseNameChunks.join('<br>');
          
          // 渲染格子
          cell.innerHTML = `<div class="course-block ${rows<=4?'start':rows>=9?'last':'medium'}" style="height: ${heightValue};" >
            <span class="course-name-text">${formattedCourseName}</span>
            <span class="course-Room">${item.room}</span>
          </div>`;
          
          const courseBlock = cell.querySelector('.course-block');
          courseBlock.onclick = () => {
            setUser(item);
            setIsShow(true);
          }
        }
      }
    })
  }

  useEffect(() => {
    const Render = async () => {
      const courses = await fetchData();
      setCourse(courses);
      renderCourse(courses);
       render(custom)
    };
    Render(); 
   
  }, [count]);
//请求自定义日程
  const fetchData1 = async () => {
    try {
      const response = await getCustom(); 
      const custom = MockSchedule.custom; 
      console.log(custom);
      return custom;
    } catch (err) {
      console.error('请求课程数据失败:', err); 
      throw err; 
    }
  }
  //渲染日程
  const render =(custom)=>{
     custom.forEach((item) => {
   if(count===item.week){
const rows=item.starttime;
 const col = item.weekday + 1;
 const end = item.endtime;
 const gap=end-col;
 const heightValue = `${gap * 100}%`;
  const cell = document.querySelector(`.course-cell[data-row="${rows}"][data-col="${col}"]`);
  if(cell){
    cell.innerHTML = `<div class="custom-block" style="height: ${heightValue}" >
            <span class="course-name-text">${item.title}</span>
            <span class="course-Room">${item.content}</span>
          </div>`;
  }
   }
  });
  }
  useEffect(() => {
    const Render1 = async () => {
      const custom= await fetchData1();
   setCustom( custom)
      render(custom)
        setChangeCustom(false)
    };
   if(changecustom){
    Render1();}
  }, [changecustom]);

  // 点击显示遮蔽层
  const ModelClick = (row, col, e) => {
    e.stopPropagation();

    if (closeTimer.current) return; 

    if (selectRef.current && selectRef.current.row === row && selectRef.current.col === col) {
      setShowdadd(true);
       selectRef.current = null;
      setShowmask(false);
    } else {
      setShowdadd(false);
      setShowmask(true);
     const cell = { row, col };
        selectRef.current = cell;
    setSelect(cell);
   
    }
  };

  

  return ( 
    <div className='allpage' style={style}>
      {/* 顶部导航栏 */}
      <div className="topbar">
        <span className='week'>{weekie}</span>
        <button className='changebtn' onClick={backnow}>回到本周</button>
      </div>
     
      <div className="content">
        {/* 头部 */}
        <Header 
          count={count} 
          setCount={setCount} 
          weekcount={weekcount} 
          Setweekie={Setweekie} 
          backnow={backnow} 
          weekie={weekie}
          startDate={startDate} 
        />
        
        {/* 课程行 */}
        <div className="course">
          {Array.from({ length: 12 }, (_, rowIndex) => (
            <div key={rowIndex} className="course-row">
              <div className="row-number">{rowIndex + 1}</div>
              {Array.from({ length: 7 }, (_, colIndex) => (
                <div 
                  key={colIndex} 
                  className="course-cell"
                  data-row={rowIndex + 1}
                  data-col={colIndex + 2}
                  onClick={(e) => ModelClick(rowIndex + 1, colIndex + 2, e)}
                >
                  {showmask && selectRef.current?.row === rowIndex + 1 && selectRef.current?.col === colIndex + 2 && (
                    <div className={`mask-layer ${isFadingOut ? 'fade-out' : ''}`} ref={closeui}>
                      <img src={img1} alt="mask" />
                    </div>
                  )}
                </div>
              ))}    
            </div>
          ))}
        </div>
        
        {/* 详细内容 */}
        <Detail isShow={isShow} user={user} daycount={daycount} setIsShow={setIsShow}/>
        
      
      </div>
    </div>
  );
};

export default Content;