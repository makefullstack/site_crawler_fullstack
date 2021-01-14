import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequestAction, PollingRequestAction, SelectedMenuAction } from '../reducer'
import 'antd/dist/antd.css';
import './list.css';
import { List, Avatar, Button } from 'antd';



const getImageURL = (site) => {
  switch (site) {
    case 'ruliwebhumor':
      return 'https://cdn.discordapp.com/attachments/798825962116481030/798826046568792064/ruliweb_logo.png'; 
    case 'fmkorea':
      return 'https://cdn.discordapp.com/attachments/798825962116481030/798826045469360178/fmkorea_logo.png';
    case 'dcbaseball':
      return 'https://cdn.discordapp.com/attachments/798825962116481030/798826043896365105/dcyagall_logo.png';
  }
  return null;
}

const MainList = ({ selectedKey }) => {
  const dispatch = useDispatch();
  const { state, lists, isMoreLoad, needInitLoad } = useSelector(state => state.selected[selectedKey]);
  const { load: pollingLoad, error: pollingError, done:pollingDone } = useSelector(state => state.selected.polling);

  useEffect(() => {
    if (needInitLoad) {
      dispatch(GetRequestAction(selectedKey, null));
    } else if (!pollingLoad) {
      dispatch(PollingRequestAction(selectedKey, lists[0]?.id));
    }
  }, [selectedKey, pollingLoad, lists, needInitLoad]);


  const onLoadData = useCallback(() => {
    if (state.load || !isMoreLoad) return;
    const lastId = lists[lists.length - 1]?.id;
    dispatch(GetRequestAction(selectedKey, lastId));
  }, [selectedKey, lists, state, isMoreLoad]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 200) {
        onLoadData();
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [selectedKey, state, isMoreLoad, lists]);

  const loadMore = useMemo(() => ( 
    !needInitLoad&& !state.load && isMoreLoad ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadData}>loading more</Button>
      </div>
    ) : null
  ), [selectedKey, lists.length, state.load, isMoreLoad]);

  return (
    <List
      itemLayout="horizontal"
      loading={needInitLoad}
      dataSource={lists}
      loadMore={loadMore}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            key={item.site + item.postId}
            className='itemMeta'
            avatar={<Avatar src={getImageURL(item.site)} />}
            title={<a onClick={() => dispatch(SelectedMenuAction(item.site))}>{item.site}</a>}
            description={<a style={{color: "SlateGray"}} href={item.url} target="_blank">{item.title}</a>}
          />
        </List.Item>
      )}
    />
  );
}

export default MainList;