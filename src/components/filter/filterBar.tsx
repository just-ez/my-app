import './filterBar.css'
import  React, { useState } from 'react';
import expand from '../../assets/img/expand.svg'
import expand_less from '../../assets/img/expand_less.svg'
export interface filterProps {

}

export function FilterBar (props: filterProps) {
  const [isActive, setIsActive] = useState(Number)
  const [itemInput, setItemInput] = useState(String)
  const [ordeInput, setOrderInput] = useState(String)
  // const [itemInput, setItemInput] = useState(String)
  
  const toggleShowFaq = (id: number) => {
		if (isActive === id) {
			setIsActive(Number);
		} else {
			setIsActive(id);
		}
	};
    return (
      <aside className='filterBar'>
        <div className="aside-header">
          <h1>
            Set Parameters
          </h1>
          <p>3 parameters available</p>
        </div>

      <div className="filter-parent">
        <div className="filter-child"  onClick={() => toggleShowFaq(1)}>
        <div className="filter-name">
          <h2>Item</h2>
          <img src={isActive !== 1 ? expand : expand_less} alt="" />
        </div>
     {
      isActive === 1  && (
        <div className="filter-data">
        <textarea name="" id="" value={itemInput} onChange={(e)=> setItemInput(e.target.value)}/>
      </div>
      )
     }
        </div>

        <div className="filter-child"  onClick={() => toggleShowFaq(2)}>
        <div className="filter-name">
          <h2>OrderId</h2>
          <img src={isActive !== 2 ? expand : expand_less} alt="" />
        </div>
     {
      isActive === 2  && (
        <div className="filter-data">
        <textarea  name="" id="" value={ordeInput} onChange={(e)=> setOrderInput(e.target.value)}/>
      </div>
      )
     }
        </div>

        <div className="filter-child"  onClick={() => toggleShowFaq(3)}>
        <div className="filter-name">
          <h2>Type</h2>
          <img src={isActive !== 3 ? expand : expand_less} alt="" />
        </div>
     {
      isActive === 3  && (
        <div className="filter-data">
        <form method="post" action="/Tests/Post/">    
        <div id="check"><input type="checkbox" name="favorite_pet" value="All" id='All'/><label htmlFor="All">Select All</label></div>  
        <div id="check"><input type="checkbox" name="favorite_pet" value="CAO" id='CFO'/><label htmlFor="CFO">CFO</label></div>  
        <div id="check"><input type="checkbox" name="favorite_pet" value="EDF" id='EDF'/><label htmlFor="CFO">EDF</label></div>  
        <div id="check"><input type="checkbox" name="favorite_pet" value="SFO" id='SFO'/><label htmlFor="SFO">SFO</label></div>  
</form>
      </div>
      )
     }
        </div>

      </div>
        
      </aside>
    );
}
