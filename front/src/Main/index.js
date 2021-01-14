import React from 'react';
import { useSelector } from 'react-redux';
import MainList from './MainList';


const Main = () => {
  const { selectedKey } = useSelector(state => state.selected);

  return (
    <MainList selectedKey={selectedKey}/> 
  )
}

export default Main;