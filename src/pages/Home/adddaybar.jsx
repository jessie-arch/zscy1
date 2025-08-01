import './adddaybar.css';
import { useRef, useEffect, useState } from 'react';

const itemHeight = 0.8 * 100; 

const AddDayBar = ({ custom, setcustom, daycount, showday, setshowday, coursecount,detailtime,setdetailtime }) => {
  const dayRef = useRef(null);//周几
  const startRef = useRef(null);//开始的课
  const endRef = useRef(null);//结束的课
//如果存在当前项就显示当前项

  const [selectedIdx, setSelectedIdx] = useState({
    
  day:  0,
    start:  0,
    end:  0
   
  })

  const padded = (arr) => ['', '', ...arr, '', '']; // 前后添加空项

  const paddedDays = padded(daycount);
  const paddedCourses = padded(coursecount);
//初始化滚动位置
useEffect(() => {
    if (showday) {
        // 移除所有setcustom调用
        const dayIndex = daycount.indexOf(custom.weekday ?? daycount[0]) + 2;
        const startIndex = coursecount.indexOf(custom.starttime ?? coursecount[0]) + 2;
        const endIndex = coursecount.indexOf(custom.endtime ?? coursecount[0]) + 2;

        // 仅保留滚动逻辑
        if (dayRef.current)
            dayRef.current.scrollTop = dayIndex * itemHeight;
        if (startRef.current)
            startRef.current.scrollTop = startIndex * itemHeight;
        if (endRef.current)
            endRef.current.scrollTop = endIndex * itemHeight;
//更新
        setSelectedIdx({
            day: dayIndex,
            start: startIndex,
            end: endIndex
        });
    }
}, [showday,custom]);
//滚动状态的函数
  const handleScroll = (ref, list, key) => {
    const index = Math.round(ref.current.scrollTop / itemHeight);
    setSelectedIdx((prev) => ({ ...prev, [key]: index }));
  };
//将索引传入
  const handleConfirm = () => {
    const newcustom={
        ...custom,
      weekday: selectedIdx.day+2 ,
      starttime: selectedIdx.start+3 ,
      endtime: selectedIdx.end+3
    }
    setcustom(newcustom)
    if(newcustom.starttime===newcustom.endtime){
  setdetailtime ([...detailtime, `周${daycount[newcustom.weekday]} 第${coursecount[newcustom.starttime]  }节课`]);}
  else if(newcustom.starttime!=newcustom.endtime){
setdetailtime ([...detailtime, `周${daycount[newcustom.weekday]} 第${coursecount[newcustom.endtime]  }-${coursecount[custom.starttime]  }节课`]);
  }
   setshowday(false);
  }; 

  return (
    <div className={`adddaybar ${showday ? 'show' : ''}`}>
      <div className="picker">
        <div className="mask-top"></div>
        <div className="mask-bottom"></div>
        <div className="center-line"></div>

        <div className="daypick" ref={dayRef} onScroll={() => handleScroll(dayRef, daycount, 'day')}>
          <ul>
            {paddedDays.map((item, idx) => (
              <li key={idx} className={idx === selectedIdx.day ? 'selected' : ''}>
                {item ? `周 ${item}` : ''}
              </li>
            ))}
          </ul>
        </div>

        <div className="startcourse" ref={startRef} onScroll={() => handleScroll(startRef, coursecount, 'start')}>
          <ul>
            {paddedCourses.map((item, idx) => (
              <li key={idx} className={idx === selectedIdx.start ? 'selected' : ''}>
                {item ? `第 ${item} 节课` : ''}
              </li>
            ))}
          </ul>
        </div>

        <div className="endcourse" ref={endRef} onScroll={() => handleScroll(endRef, coursecount, 'end')}>
          <ul>
            {paddedCourses.map((item, idx) => (
              <li key={idx} className={idx === selectedIdx.end ? 'selected' : ''}>
                {item ? `第 ${item} 节课` : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="button" onClick={handleConfirm}>确定</div>
    </div>
  );
};

export default AddDayBar;