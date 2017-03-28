import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localeData } from '../../../reducers/localization';
import {getCategories} from '../../../actions/category';
import {removeProduct}  from '../../../actions/product';
import {PRODUCT_CONSTANTS as c}  from '../../../utils/constants';

import AppHeader from '../../AppHeader';
import Add from "grommet/components/icons/base/Add";
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Edit from "grommet/components/icons/base/Edit";
import FilterControl from 'grommet-addons/components/FilterControl';
import Header from 'grommet/components/Header';
import HelpIcon from 'grommet/components/icons/base/Help';
import Search from 'grommet/components/Search';
import Section from 'grommet/components/Section';
import Spinning from 'grommet/components/icons/Spinning';
import ProductFilter from './ProductFilter';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Trash from "grommet/components/icons/base/Trash";
//import Tiles from 'grommet/components/Tiles';
import Title from 'grommet/components/Title';
//import ProductTile from './ProductTile';
import UploadIcon from 'grommet/components/icons/base/Upload';

class Product extends Component {
  
  constructor () {
    super();
    this.state = {
      errors: [],
      products: [],
      product: {},
      searchText: '',
      filterActive: false,
      filteredCount: 0,
      unfilteredCount: 0
    };
    this.localeData = localeData();
    this._loadProduct = this._loadProduct.bind(this);
    this._productSort = this._productSort.bind(this);
    this._renderProducts = this._renderProducts.bind(this);
  }

  componentWillMount () {
    console.log('componentWillMount');
    const {loaded,categories,filter,sort} = this.props.category;
    if (!loaded) {
      this.props.dispatch(getCategories());
    } else {
      // this._loadSubCategory(categories,filter,sort);
      // this.setState({cFilter: this.props.category.categories[0].name});
      this._loadProduct(categories,filter,sort);
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps');
    // if (!this.props.category.loaded && nextProps.category.loaded) {
    //   this.setState({cFilter: nextProps.category.categories[0].name});
    // }
    if (this.props.category.toggleStatus != nextProps.category.toggleStatus) {
      const {categories,filter,sort} = nextProps.category;
      this._loadProduct(categories,filter,sort);
    }
  }

  _loadProduct (categories,filter,sort) {
    console.log("_loadProduct()");
    let list1 = [] ;
    categories.forEach(c => {
      c.subCategoryList.forEach(sc => {
        sc.productList.forEach(p => {
          list1.push({...p, subCategory: sc, category: c});
        });
      });
    });

    console.log(list1);

    if ('category' in filter) {

      const categoryFilter = filter.category;
      let list2 = list1.filter(c => categoryFilter.includes(c.category.name));
      list2 = this._productSort(list2,sort);
      this.setState({products: list2, filteredCount: list2.length, unfilteredCount: list1.length});    
    } else {
      list1 = this._productSort(list1,sort);
      this.setState({products: list1, filteredCount: list1.length, unfilteredCount: list1.length}); 
    }
  }

  _productSort (products,sort) {
    const [sortProperty,sortDirection] = sort.split(':');
    let result = products.sort((a,b) => {
      if (sortProperty == 'name' && sortDirection == 'asc') {
        return (a.name < b.name) ? -1 : 1;
      } else if (sortProperty == 'name' && sortDirection == 'desc') {
        return (a.name > b.name) ? -1 : 1;
      }
    });
    return result;
  }

  _onSearch () {
    console.log('_onSearch');
  }

  _onFilterActivate () {
    console.log(this.props.category.filter);
    console.log(this.props.category.sort);
    this.setState({filterActive: true});
  }

  _onFilterDeactivate () {
    this.setState({filterActive: false});
  }

  _onChangeInput ( event ) {
    var product = this.state.product;
    product[event.target.getAttribute('name')] = event.target.value;
    this.setState({product: product});
  }

  _onAddClick () {
    console.log('_onAddClick');
    this.props.dispatch({type: c.PRODUCT_ADD_FORM_TOGGLE,payload: {adding: true}});
  }

  _onUploadClick () {
    console.log('_onUploadClick');
  }

  _onRemoveClick (index) {
    console.log('_onRemoveClick');
    const {products} = this.state;

    this.props.dispatch(removeProduct(products[index]));
  }

  _onEditClick (index) {
    console.log('_onEditClick');
    const {products} = this.state;
    this.props.dispatch({type: c.PRODUCT_EDIT_FORM_TOGGLE, payload:{editing: true, product: products[index]}});
    this.context.router.push('/product/edit');
  }

  /*_renderProducts (products) {
    const items = products.map((p, index)=>{
      let sections = '  ';
      p.sectionList.forEach(s => sections += s.name + ', ');
      let suppliers = '  ';
      p.supplierList.forEach(s => suppliers += s.name + ', ');
      return (
        <ProductTile key={index} name={p.name} desc={p.description} category={p.category.name} subCategory={p.subCategory.name} 
          sections={sections.substring(0,sections.length-2).trim()} suppliers={suppliers.substring(0,suppliers.length-2).trim()} 
          id={p.id} itemCode={p.itemCode} price={p.price} classType={p.classType} 
          demand={p.demand} t1={p.timeOrdering} t2={p.timeProcurement} t3={p.timeTransporation} t4={p.timeBuffer} 
          uomP={p.uomPurchase} uomC={p.uomConsumption} cFactor={p.conversionFactor} kanbanType={p.kanbanType} 
          noOfBin={p.noOfBins} binQty={p.binQty} pktSize={p.packetSize} />

      );
    });
    return items;
  }*/

  _renderProducts (products) {
    const items = products.map((p, index)=>{
      let sections = '  ';
      p.sectionList.forEach(s => sections += s.name + ', ');
      let suppliers = '  ';
      p.supplierList.forEach(s => suppliers += s.name + ', ');
      return (
        <TableRow key={index}  >
          <td >{p.id}</td>
          <td>{p.itemCode}</td>
          <td >{p.name}</td>
          <td >{p.category.name}</td>
          <td >{p.subCategory.name}</td>
          <td >{sections.substring(0,sections.length-2).trim()}</td>
          <td >{suppliers.substring(0,suppliers.length-2).trim()}</td>
          <td>{p.price}</td>
          <td>{p.classType}</td>
          <td style={{textAlign: 'right', padding: 0}}>
            <Button icon={<Edit />} onClick={this._onEditClick.bind(this,index)} />
            <Button icon={<Trash />} onClick={this._onRemoveClick.bind(this,index)} />
          </td>
        </TableRow>

      );
    });
    return items;
  }

  render() {
    const {fetching} = this.props.category;
    const { products, searchText, filterActive,filteredCount,unfilteredCount } = this.state;

    const loading = fetching ? (<Spinning />) : null;

    const items = this._renderProducts(products);

    const layerFilter = filterActive ? <ProductFilter onClose={this._onFilterDeactivate.bind(this)}/> : null;

    /*let addControl;
    if ('read only' !== role) {
      addControl = (
        <Anchor icon={<AddIcon />} path='/product/add'
          a11yTitle={`Add Product`} />
      );
    }*/
    let addControl = (<Anchor icon={<Add />} path='/product/add' a11yTitle={`Add Product`} onClick={this._onAddClick.bind(this)}/>);
    let uploadControl = (<Anchor icon={<UploadIcon />} path='/product/upload' a11yTitle={`Upload Product`} onClick={this._onUploadClick.bind(this)}/>);
    let helpControl = (<Anchor icon={<HelpIcon />} path='/product/help' a11yTitle={`Help`} onClick={this._onUploadClick.bind(this)}/>);
    //let editControl = (<Anchor icon={<Add />} path='/product/add' a11yTitle={`Add Product`} onClick={this._onAddClick.bind(this)}/>);


    return (
      <Box >
        <AppHeader/>

        <Header size='large' pad={{ horizontal: 'medium' }}>
          <Title>
            <span>{this.localeData.label_product}</span>
          </Title>
          <Search inline={true} fill={true} size='medium' placeHolder='Search'
            value={searchText} onDOMChange={this._onSearch.bind(this)} />
          {uploadControl}
          {addControl}
          <FilterControl filteredTotal={filteredCount}
            unfilteredTotal={unfilteredCount}
            onClick={this._onFilterActivate.bind(this)} />
            {helpControl}
        </Header>

        <Section direction="column" pad={{vertical: 'large', horizontal:'small'}}>
          <Box size="xsmall" alignSelf="center" pad={{horizontal:'medium'}}>{loading}</Box>
          <Box full="horizontal" wrap={true} size='full'>
            {/*<Tiles fill={true} flush={true}>
              {items}
            </Tiles>*/}

            <Table scrollable={true}>
              <TableHeader labels={['Id','ItemCode','Product Name','Category','Sub Category','Section','Supplier', 'Price', 'Class Type','ACTION']} />
              
              <tbody>{items}</tbody>
            </Table>

          </Box>
        </Section>
        {layerFilter}
      </Box>
    );
  }
}

Product.contextTypes = {
  router: PropTypes.object
};

let select = (store) => {
  return { category: store.category};
};

export default connect(select)(Product);
