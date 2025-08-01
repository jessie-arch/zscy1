import {addCustom,updateCustom,deleteCustom} from "../../mock/api.js"
import {useState,useRef,useEffect} from 'react';
import AddDayBar from "./adddaybar.jsx"
import  MockSchedule from "../../mock/schedulemock.js";
import "../../fonts/iconfont.css" 
import "./addcourse.css"
import Addweekbar from "./addweekbar.jsx"
import img2 from "../../assets/add.png"
import img3 from "../../assets/delete.png"
const AddCourse=({  select 
  ,weekie,count,setShowdadd, changecustom,
  setChangeCustom
})=>{
    //课程时间按钮 
     const Clickweek=()=>{
        setweekbarshow(true);
      }
      const clickday=()=>{
        setshowday(true);
      }
      
  const handleDeleteTime = (indexToDelete) => {
    
  setdetailtime(prev => prev.filter((_, index) => index !== indexToDelete));
};//小叉叉部分 
  const[weekbarshow,setweekbarshow]=useState(false)//判断选择周的组件是否出现
  const [showday, setshowday] = useState(false);//判断选择日期的组件是否出现
  const[detailtime,setdetailtime]=useState([]);//存储具体节数即two部分
   const weekcount = ['整学期','第一周','第二周','第三周','第四周','第五周','第六周','第七周','第八周','第九周','第十周','第十一周','第十二周','第十三周','第十四周','第十五周','第十六周','第十七周','第十八周','第十九周','第二十周','第二十一周'];
   const daycount=['一','二','三','四','五','六','日']
   const coursecount=['一','二','三','四','五','六','七','八','九','十','十一','十二']
   const safeSelect = select || { row: 0, col: 0 };
        const[butcount,setbutcount]=useState(0)
    //改变文字标题和内容的状态
    const[inputValue,setInputValue]=useState("")
    //改变ui状态一二页
    const[set,changeset]=useState(false)
    //二三页的ui
    const[show,setshow]=useState(false)
    //数据的中间状态
    const [coursedetail,setcoursedetail]=useState([])
  const[custom,setcustom]=useState({});//存储自定义的信息
 const items=["自习","值班","考试","英语","开会","作业","补课","实验","复习","学习"]
    //发送请求添加课程
    const buttonClick=()=>{
    if(butcount===0){
changeset(true)
setcustom(prev=>({
  ...prev,
  title:inputValue,
  week:count,
  weekday:safeSelect.col-1,
  starttime: safeSelect.row,
  endtime: safeSelect.row
}))
 
setInputValue(" ")
setbutcount(1)
    }
    if(butcount===1){ 
      setdetailtime(prev => [...prev, `周${daycount[safeSelect.col-1]} 第${coursecount[safeSelect.row] }节课`]);
     setshow(true)
setcustom(prev=>({
      ...prev,
       content:inputValue
     }))
     setInputValue(" ")
 setbutcount(2)
    } 
  
if(butcount===2){
           setshow(true)
           setbutcount(3)
 }}
 useEffect(() => {
  if(butcount===3){
    const handleSubmit = async () => {
    try {
        await addCustom(custom);
     
      setShowdadd(false)
       setbutcount(0); 
         setChangeCustom(true)
    } catch (error) {
        console.error('添加失败:', error);
    }
}
 handleSubmit();
}},[butcount])
return(
   
       <div className="addcourse">
        <div className="text">
          {set&&show===false && (
  <div className={`smalltitle ${set ? "fadein" : ""}`}>标题：
      <span className="detailtitle">{custom.title?custom.title:" "}</span>
  </div>
)}
{show===true&&(
  <div className="lasttitle">{custom.title?custom.title:" "}</div>
)}
        <span className="title"></span>
         {show===false&&  <div className="for">
            为你的行程添加<br/>
            {set===true?'具体内容':'一个标题'}
            </div>}
<input type='text' className="inputarea" value={inputValue}   onChange={(e) => setInputValue(e.target.value)}/>
{!set&&(<ul className={`buttons ${!set?"":"fadeout "}`}>
     {items.map((item, index) => (
          <li
            key={index}
             onClick={() => setInputValue(prev => prev + item)}
          >
            {item}
          </li>
        ))}
</ul>)}
{show===true&&(
  <div className={`options ${set ? "fadein" : ""}`}>
    
    <div className="one" onClick={Clickweek} >{weekcount[custom.week]}</div>
   
    <ul className="two">
     
       {detailtime.map((item, index) => (
    <li key={index} onClick={clickday}>
 {detailtime[index]}
       <div className="delete"  key={`delete ${index}`}>
         <div className="delete" onClick={(e) =>{
            e.stopPropagation
          handleDeleteTime(index)}}/>
              <img src={img3}  />
            </div>
      </li>
  ))}  
      <li className="imgbox" onClick={clickday}><img src={img2}  /></li>
  </ul>
    </div>
)}</div>

<button className="next"  onClick={ buttonClick}>
    <span className="iconfont icon-a-youjiantouzhixiangyoujiantou"></span>
</button>
<Addweekbar custom={custom} setcustom={setcustom} weekcount={weekcount} weekbarshow={weekbarshow} setweekbarshow={setweekbarshow}/>
           <AddDayBar custom={custom} setcustom={setcustom} daycount={daycount} showday={showday} setshowday={setshowday} coursecount={coursecount} detailtime={detailtime} setdetailtime={setdetailtime}/>
            </div>
)
}
export default AddCourse