import React, { Component } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
class InfoBox extends Component {
   
    render() { 
        const {labelText,labelClass,contentData,contentClass}=this.props;
        if(labelText===null||labelClass===null||contentData===null||contentClass===null){
            return (<Skeleton variant="rect"  />)
        }
        return (  
        <>
        <div className={`${labelClass}`}>
        <span>{labelText}</span>
        </div>
         <div className={`${contentClass}`}>
          <span>{contentData}</span>
         </div>
         </> 
         );
    }
}
 
export default InfoBox;