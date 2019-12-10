import './style.scss';
import React,{Fragment} from 'react';
import TabsNavbarScroll from './TabsNavbarScroll';
import TabNavbar from './TabNavbar';

const Tabs = props => {
  const { children, onClickfunc, activeTab, classPrefix, isScrollable } = props;
  return (
    <Fragment>
      {isScrollable ? (
        <TabsNavbarScroll
          classPrefix={classPrefix}
          children={children}
          onClickfunc={onClickfunc}
          activeTab={activeTab}
        />
      ) : (
        <TabNavbar
          classPrefix={classPrefix}
          children={children}
          onClickfunc={onClickfunc}
          activeTab={activeTab}
        />
      )}
        {children.map(
          child => child.props.tabsLabel === activeTab && child.props.children
        )}
    </Fragment>
  );
};

export default Tabs;
