

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './GoodsShelfStockCount.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'


const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(goodsShelfStockCount)=>{return [
	 ]}

const internalImageListOf = (goodsShelfStockCount) =>defaultImageListOf(goodsShelfStockCount,imageList)

const optionList =(goodsShelfStockCount)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (goodsShelfStockCount) =>defaultSettingListOf(goodsShelfStockCount, optionList)
const internalLargeTextOf = (goodsShelfStockCount) =>{

	return null
	

}







const internalRenderExtraHeader = defaultRenderExtraHeader




const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf

const internalSummaryOf = (goodsShelfStockCount,targetComponent) =>{
	
	
	const {GoodsShelfStockCountService} = GlobalComponents
	
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{goodsShelfStockCount.id}</Description> 
<Description term="头衔">{goodsShelfStockCount.title}</Description> 
<Description term="计数时间">{ moment(goodsShelfStockCount.countTime).format('YYYY-MM-DD')}</Description> 
<Description term="概览">{goodsShelfStockCount.summary}</Description> 
<Description term="架">{goodsShelfStockCount.shelf==null?"未分配":goodsShelfStockCount.shelf.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"架","goodsShelf",GoodsShelfStockCountService.requestCandidateShelf,
	      GoodsShelfStockCountService.transferToAnotherShelf,"anotherShelfId",goodsShelfStockCount.shelf?goodsShelfStockCount.shelf.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
	
        {buildTransferModal(goodsShelfStockCount,targetComponent)}
      </DescriptionList>
	)

}


class GoodsShelfStockCountDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'goodsShelfStockCount'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, stockCountIssueTrackListMetaInfo, stockCountIssueTrackCount } = this.props.goodsShelfStockCount
    if(!this.props.goodsShelfStockCount.class){
      return null
    }
    const cardsData = {cardsName:"货架库存盘点",cardsFor: "goodsShelfStockCount",cardsSource: this.props.goodsShelfStockCount,
  		subItems: [
{name: 'stockCountIssueTrackList', displayName:'库存计数问题跟踪',type:'stockCountIssueTrack',count:stockCountIssueTrackCount,addFunction: true, role: 'stockCountIssueTrack', metaInfo: stockCountIssueTrackListMetaInfo},
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  goodsShelfStockCount: state._goodsShelfStockCount,
}))(Form.create()(GoodsShelfStockCountDashboard))

