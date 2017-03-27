import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localeData } from '../../../reducers/localization';
import {addProduct}  from '../../../actions/product';
import {SUPPLIER_CONSTANTS as c}  from '../../../utils/constants';

import AddIcon from "grommet/components/icons/base/Add";
import AppHeader from '../../AppHeader';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';


class ProductAdd extends Component {

  constructor () {
    super();

    this.state = {
      product: {
        address: {}
      },
      categories: [],
      category: 'Select Category',
      subCategories: [],
      subCategory: 'Select Sub Category',
      errors: []
    };

    this.localeData = localeData();
  }

  componentWillMount () {
    const {categories} = this.props.category;
    const list = categories.map(c => c.name);
    this.setState({categories: list});
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.category.adding) {
      this.context.router.push('/product');
    }
  }

  _onSubmit (event) {
    event.preventDefault();
    let {product, category, subCategory} = this.state;

    if (category.includes('Select') || subCategory.includes('Select')) {
      alert('Category or Sub Category not selected.');
      return;
    }

    const {categories} = this.props.category;
    const i = categories.findIndex(c=> c.name === category);
    const cId = categories[i].id;
    const j = categories[i].subCategoryList.findIndex(sc => sc.name === subCategory);
    const scId = categories[i].subCategoryList[j].id;

    let url = window.serviceHost + '/categories/' + cId + '/subCategories/' + scId + '/products';
    

    // if (Object.getOwnPropertyNames(product.sections).length === 0) {
    //   delete product.sections;
    // }
    console.log(url);
    console.log(product);
    this.props.dispatch(addProduct(url,product));
  }

  _onSectionAdd (event) {
    console.log('_onSectionAdd');
  }

  _onSupplierAdd (event) {
    console.log('_onSupplierAdd');
  }

  _onChange (event) {
    let product = this.state.product;
    product[event.target.getAttribute('name')] = event.target.value;
    this.setState({product: product});
  }

  _cFilter (event) {
    console.log('_cFilter');
    let {category} = this.state;
    category = event.value;
    const {categories} = this.props.category;
    let i = categories.findIndex(c=> c.name === category);
    console.log(categories[i]);

    const subCategories = categories[i].subCategoryList.map(sc => sc.name);
    console.log(subCategories);
    this.setState({category: category, subCategories: subCategories, subCategory: 'Select Sub Category'});
  }

  _scFilter (event) {
    let {subCategory} = this.state;
    subCategory = event.value;
    this.setState({subCategory: subCategory});
  }

  _onClose (event) {
    this.props.dispatch({type: c.SUPPLIER_ADD_FORM_TOGGLE, payload: {adding: false}});
  }


  render () {
    const {product,errors,categories,category,subCategories,subCategory} = this.state;

    return (
      <Box>
        <AppHeader/>
        <Section>
          <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
            <Form onSubmit={this._onSubmit}>

              <Header size="large" justify="between" pad="none">
                <Heading tag="h2" margin="none" strong={true}>{this.localeData.label_product_add}</Heading>
                <Anchor icon={<CloseIcon />} path="/product" a11yTitle='Close Add Product Form' onClick={this._onClose.bind(this)} />
              </Header>

              <FormFields>

                <fieldset>
                  <FormField label="Category" htmlFor="sType" error={errors[0]}>
                    <Select id="sType" name="sType" options={categories}
                      value={category}  onChange={this._cFilter.bind(this)} />
                  </FormField>
                  <FormField label="Sub Category" htmlFor="sType" error={errors[0]}>
                    <Select id="sType" name="sType" options={subCategories}
                      value={subCategory}  onChange={this._scFilter.bind(this)} />
                  </FormField>

                  <FormField label="Product Name" error={errors[0]}>
                    <input type="text" name="name" value={product.name} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Product Description" error={errors[0]}>
                    <input type="text" name="description" value={product.description} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Item Code" error={errors[0]}>
                    <input type="text" name="itemCode" value={product.itemCode} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Price" error={errors[0]}>
                    <input type="text" name="price" value={product.price} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Minimum Order Quantity" error={errors[0]}>
                    <input type="text" name="minOrderQty" value={product.minOrderQty} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Packet Size" error={errors[0]}>
                    <input type="text" name="packetSize" value={product.packetSize} onChange={this._onChange.bind(this)} />
                  </FormField>
                  
                </fieldset>

                <fieldset>
                  <Box direction="row" justify="between">
                    <Heading tag="h3">Lead Times</Heading>
                  </Box>
                  <FormField label="Ordering time" error={errors[0]}>
                    <input type="text" name="timeOrdering" value={product.timeOrdering} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Procurement Time" error={errors[0]}>
                    <input type="text" name="timeProcurement" value={product.timeProcurement} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Transportation Time" error={errors[0]}>
                    <input type="text" name="timeTransporation" value={product.timeTransporation} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Buffer Time" error={errors[0]}>
                    <input type="text" name="timeBuffer" value={product.timeBuffer} onChange={this._onChange.bind(this)} />
                  </FormField>
                </fieldset>

                <fieldset>
                  <Box direction="row" justify="between">
                    <Heading tag="h3">Units of Measurement</Heading>
                  </Box>
                  <FormField label="Purchase" error={errors[0]}>
                    <input type="text" name="uomPurchase" value={product.uomPurchase} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Consumption" error={errors[0]}>
                    <input type="text" name="uomConsumption" value={product.uomConsumption} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Conversion Factor" error={errors[0]}>
                    <input type="text" name="conversionFactor" value={product.conversionFactor} onChange={this._onChange.bind(this)} />
                  </FormField>
                </fieldset>

                <fieldset>
                  <Header size="small" justify="between">
                    <Heading tag="h3">Sections</Heading>
                    <Button icon={<AddIcon />} onClick={this._onSectionAdd.bind(this)}
                      a11yTitle='Add Section' />
                  </Header>
                  {/*<List>
                    {{networks}}
                  </List>*/}
                </fieldset>

                <fieldset>
                  <Header size="small" justify="between">
                    <Heading tag="h3">Suppliers</Heading>
                    <Button icon={<AddIcon />} onClick={this._onSupplierAdd.bind(this)}
                      a11yTitle='Add Supplier' />
                  </Header>
                  {/*<List>
                    {{networks}}
                  </List>*/}
                </fieldset>

              </FormFields>

              <Footer pad={{vertical: 'medium'}}>
                <span />
                <Button type="submit" primary={true} label={this.localeData.product_add_btn}
                  onClick={this._onSubmit.bind(this)} />
              </Footer>
            </Form>
          </Article>

        </Section>
      </Box>
      
    );
  }
}

ProductAdd.contextTypes = {
  router: PropTypes.object
};

let select = (store) => {
  return {category: store.category};
};

export default connect(select)(ProductAdd);
