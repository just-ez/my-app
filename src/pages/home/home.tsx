import "./home.css";
import "../../components/filter/filterBar.css";
import "../../components/nav/nav.css";
// import Nav from '../../components/nav/nav';
import SideBar from "../../components/side-bar/sideBar";
import expand from "../../assets/img/expand.svg";
import expand_less from "../../assets/img/expand_less.svg";
import searchBtn from "../../assets/img/search.svg";
import filter from "../../assets/img/filter.svg";

import Data from "../../assets/data";
import {  useRef, useState, useEffect } from "react";

function Home() {
  const [data, setDAta] = useState(Data);
  const [newData, setNewData] = useState<typeof Data>([]);

  useEffect(() => {
    console.log("new", filterChild);
  }, [searchFn, newData]);


  const [searchState, setSearchState] = useState(String);

  // filter state
  const [showFilter, setShowFilter] = useState(false);

  //   set a state filter input
  const [isActive, setIsActive] = useState(Number);
  const [itemInput, setItemInput] = useState(String);
  const [orderInput, setOrderInput] = useState(String);
  // const [typeAll, setTypeAll] = useState(String)
  // const [typeCFO, setTypeCFO] = useState(String)
  // const [typeEDF, setTypeEDF] = useState(String)
  // const [typeSFO, setTypeSFO] = useState(String)
  let filterChild:   string[] = []

  //   show filter input
  const toggleShowFaq = (id: number) => {
    if (isActive === id) {
      setIsActive(Number);
    } else {
      setIsActive(id);
    }
  };

  // reset checkbox
  const myCheck = useRef<HTMLInputElement>(null)
  const myCheck2 = useRef<HTMLInputElement>(null)
  const myCheck3 = useRef<HTMLInputElement>(null)
  
  function handleSearch(e: any) {
    setSearchState(e.target.value);
    
    searchFn(e.target.value)
        

  }

  function searchFn(searchTerm: string) {
    
   const comaSep = searchTerm.split(',')
    
    const regexExp = new RegExp(searchTerm, "ig");
    let filteredData: typeof Data = data.filter(
      (singleData: any) => 
        (singleData.category.match(regexExp) ||
        String(singleData.item).match(regexExp) ||
        singleData.type.match(regexExp) ||
        String(singleData.order).match(regexExp))
      );
      if (filterChild.length) {
        console.log({filterChild});
        filteredData = filteredData.filter((outputData) => filterChild.includes(outputData.type))
        console.log(filteredData);
        
      }
      if(orderInput) {
        const splitedOrder = orderInput.split(',')
        filteredData = filteredData.filter((outputData) => splitedOrder.includes(String(outputData.order))
        )
      }
   setNewData(filteredData);
  }
  
  return (
    <main>
      {/* header */}
      <header>
        <nav>
          <div className="head-txt">
            <h1>Item Search</h1>
            <p>items: {newData.length}</p>
          </div>

          <div className="query-data">
            <div className="search">
              <input type="search" name="" id="" onChange={(e)=> {
                handleSearch(e)
                // setSearchState(e.target.value)
              }} />
              <img src={searchBtn} alt="" onClick={()=> searchFn(searchState)}/>
            </div>
            <img
              src={filter}
              alt=""
              onClick={() => {
                setShowFilter(true);
                if (showFilter) return setShowFilter(false);
              }}
              title="filter"
            />
          </div>
        </nav>
        {showFilter ? (
          <aside className="filterBar">
            <div className="aside-header">
             <div>
             <h1>Set Parameters</h1>
              <p>3 parameters available</p>
             </div>
              <button onClick={()=> {
             setNewData([])
            myCheck.current?.checked === true ? myCheck.current.checked = false : console.log('hi');
            myCheck2.current?.checked === true ? myCheck2.current.checked = false : console.log('hi');
            myCheck3.current?.checked === true ? myCheck3.current.checked = false : console.log('hi');
              filterChild = []
              }}>reset All</button>
            </div>

            <div className="filter-parent">
              <div className="filter-child" onClick={() => toggleShowFaq(1)}>
                <div className="filter-name">
                  <h2>OrderId</h2>
                  <img src={isActive !== 1 ? expand : expand_less} alt="" />
                </div>
                {isActive === 1 && (
                  <div className="filter-data">
                    <textarea
                      name=""
                      id=""
                      value={orderInput}
                      onChange={(e) => {
                        // e.target.value = e.target.value.replace(/[^0-9]/g,'')
                        setOrderInput(e.target.value)
                        searchFn(searchState)}
                        
                      }
                      placeholder="Input itemId Exp: 1224"
                    />
                  </div>
                )}
              </div>

              <div className="filter-child" onClick={() => toggleShowFaq(2)}>
                <div className="filter-name">
                  <h2>ItemId</h2>
                  <img src={isActive !== 2 ? expand : expand_less} alt="" />
                </div>
                {isActive === 2 && (
                  <div className="filter-data">
                    <textarea
                      name=""
                      id=""
                      value={itemInput}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g,'')
                        setItemInput(e.target.value)
                        searchFn(searchState)
                      }
                      }
                      placeholder="Input orderId exp: 12234324"
                    />
                  </div>
                )}
              </div>

              <div className="filter-child" onClick={() => toggleShowFaq(3)}>
                <div className="filter-name">
                  <h2>Type</h2>
                  <img src={isActive !== 3 ? expand : expand_less} alt="" />
                </div>
                {isActive === 3 && (
                  <div className="filter-data">
                    
                      {/* <div id="check">
                        <input
                          type="checkbox"
                          name="favorite_pet"
                          value="All"
                          id="All"
                          onChange={(e)=> {setTypeAll(e.target.value)
                          }}
                        />
                        <label htmlFor="All">Select All</label>
                      </div> */}
                      <div id="check">
                        <input
                          type="checkbox"
                          name="favorite_pet"
                          value="CAO"
                          id="CAO"
                          onClick={(e)=> filterChild.push(e.currentTarget.value) }
                          onChange={()=>  searchFn(searchState)}
                          ref={myCheck}
                        />
                        <label htmlFor="CAO">CAO</label>
                      </div>
                      <div id="check">
                        <input
                          type="checkbox"
                          name="favorite_pet"
                          value="EDF"
                          id="EDF"
                          ref={myCheck2}
                          onClick={(e)=> filterChild.push(e.currentTarget.value)}
                          onChange={()=>  searchFn(searchState)}
                        />
                        <label htmlFor="EDF">EDF</label>
                      </div>
                      <div id="check">
                        <input
                          type="checkbox"
                          name="favorite_pet"
                          value="SFO"
                          id="SFO"
                          ref={myCheck3}
                          onClick={(e)=> filterChild.push(e.currentTarget.value)}
                          onChange={()=>  searchFn(searchState)}
                        />
                        <label htmlFor="SFO">SFO</label>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        ) : (
          ""
        )}
      </header>

      {/* side bar */}
      <SideBar />

      {/* show data */}
      <section className="show-data">
        {newData.length ? (
          <div className="table">
            <table>
              <tr>
                <th>Order</th>
                <th>Type</th>
                <th>Item</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
              {newData ? newData.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.order}</td>
                    <td>{data.type}</td>
                    <td>{data.item}</td>
                    <td>{data.category}</td>
                    <td>{data.desc}</td>
                  </tr>
                );
              }) :
              ''
            }
            </table>
          </div>
        ) : (
          <div className="empty">
            <h2>What are you looking For?</h2>
            <p>Get started by searching & filtering a few</p>
            <button>fetch data</button>
            <p>
              {" "}
              or <span>search an items</span>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
