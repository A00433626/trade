import React from 'react'
import { Detector } from "react-detect-offline";
import StockRow from './StockRow.jsx'
import MarketTrendArrow from './MarketTrendArrow.jsx'
import {Table} from 'react-bootstrap'
import './StocksList.css'
const StocksList = (props) => {
  return (
    <div className='card' id='stocks_list'>
      <div className='card-header'>
        <div className='card-header-title'>
          Stocks
          &nbsp;
          <Detector
            render={({ online }) => (
              <span className={online ? "tag is-success" : "tag is-danger"}>
                {online ? "Live" : "Offline"}
              </span>
            )}
          />
          &nbsp;
          <button className='button is-small' onClick={props.resetData}>Clear history</button>
        </div>
      </div>
      <div className='card-content px-2'>
        { props.areStocksLoaded() ? <p className='is-size-7 has-text-info'>Click on a stock to select/unselect</p> : null }
        <Table bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>
                Value
                <MarketTrendArrow current_trend={props.market_trend} />
              </th>
              <th>History</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.stocks).map((stock_name, index) =>
              {
                let current_stock = props.stocks[stock_name];
                return (
                  <StockRow
                    key={index} stock_name={stock_name}
                    stock_data={current_stock}
                    toggleStockSelection={props.toggleStockSelection}
                  />
                )
              }
            )}
            { props.areStocksLoaded() ? null : <tr><td colSpan='4'>No stocks loaded yet!</td></tr> }
          </tbody>
        </Table>
       </div>
    </div>
  );
}

export default StocksList;
