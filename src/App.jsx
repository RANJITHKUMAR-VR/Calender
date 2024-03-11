import{useState}from'react';
import left_arrow from './Assests/arrow-left.svg';
import right_arrow from './Assests/arrow-right.svg';
import './App.css'

export default function App() {
  const [selectedDate,setselectedDate]=useState(new Date());
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayInMonth=()=>{
    const daysArray=[];
    const firstDay=new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    const lastDay=new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);
    for(let i=0;i<firstDay.getDay();i++){
      daysArray.push(null);
    }
    for(let i=1;i<=lastDay.getDate();i++){
      daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
    }
    return daysArray;
  }
  const isSameDay=(date1,date2)=>{
    return date1.getDate()===date2.getDate()&&date1.getMonth()===date2.getMonth()&&date1.getFullYear()===date2.getFullYear();
  }
  const handlechangemonth=(e)=>{
    setselectedDate(new Date(selectedDate.getFullYear(),e.target.value,1));
  }
  const handlechangeyear=(e)=>{
    setselectedDate(new Date(e.target.value,selectedDate.getMonth(),1));
  }
  return (
    <div className="calender">
      <div className='header'>
      <button onClick={()=>setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))}><img src={left_arrow}/></button>
      <select value={selectedDate.getMonth()} onChange={handlechangemonth}>
        {months.map((month,index)=>(<option key={index} value={index}>{month}</option>))}
      </select>
      <select value={selectedDate.getFullYear()} onChange={handlechangeyear}>
        {
          Array.from({length:10},(_,i)=>selectedDate.getFullYear()-5+i).map((year)=><option value={year} key={year}>{year}</option>)
        }
      </select>
      <button onClick={()=>setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))}><img src={right_arrow}/></button>
    </div>
      <div className='dayofweek' >
        {days.map((day)=><div key={day}>{day}</div>)}
        </div>
      <div className='days'>
      {
        dayInMonth().map((day,index)=>(
          <div key={index} className={day?(isSameDay(day,new Date()))?"day current":"day":"empty"}>{day?             day.getDate():" "}</div>)
                        )
      }
      </div>
    </div>
  )
}
