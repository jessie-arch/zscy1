import './addweekbar.css';

const Addweekbar=({custom,setcustom,weekcount,weekbarshow,setweekbarshow})=>{

    const changweek=(index)=>{
 setcustom(prev => ({
            ...prev,
            week: index 
        }));
    }
  
    const closeweek=()=>{
        setweekbarshow(false)
    }
return(
    <div className={`addweekbar ${weekbarshow? 'show' : ''}`}>
        <ul className='addweekbtn'>
 {weekcount.map((item, index) => (
          <li
            key={index}
            onClick={() => changweek(index)} 
          >
            <div className='delete'></div>
            {item}
          </li>
        ))}
        </ul>
            <div className='addweektext' onClick={closeweek}>确定</div>
        </div>
    
)
}
export default Addweekbar;