import './tapbar.css'
import "../../fonts/iconfont.css" 
const Tapbar=({isshow})=>{
return(
    <div  className={`tapbar ${isshow ? 'show' : 'hidden'}`}>
        <div className='tapbar-item'>
            <span className='iconfont icon-wode5' ></span>
            <p>发现</p>
        </div>
        <div className='tapbar-item'>
           <span className='iconfont icon-jianzhu'></span>
            <p>邮乐园</p>
        </div>
<div className='tapbar-item'>
           <span className='iconfont icon-wode4-copy'></span>
            <p>我的</p>
        </div>
    </div>
)
}
export default Tapbar;