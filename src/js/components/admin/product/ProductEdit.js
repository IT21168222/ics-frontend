import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localeData } from '../../../reducers/localization';
import {updateProduct}  from '../../../actions/product';
import {SUPPLIER_CONSTANTS as c}  from '../../../utils/constants';

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


class ProductEdit extends Component {

  constructor () {
    super();

    this.state = {
      product: null,
      errors: []
    };

    this.localeData = localeData();
  }

  componentWillMount () {
    console.log('componentWillMount');
    let {product} = this.props.product;
    if ( product.address == null) {
      product.address = {};
    }
    console.log(product);
    this.setState({product: product});
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.product.editing) {
      this.context.router.push('/product');
    }
  }

  _onSubmit (event) {
    event.preventDefault();
    let {product} = this.state;
    if (Object.getOwnPropertyNames(product.address).length === 0) {
      delete product.address;
    }
    console.log(product);
    this.props.dispatch(updateProduct(product));
  }

  _onChange (event) {
    let product = this.state.product;
    product[event.target.getAttribute('name')] = event.target.value;
    this.setState({product: product});
  }

  _onChangeAddress (event) {
    let product = this.state.product;
    product.address[event.target.getAttribute('name')] = event.target.value;
    this.setState({product: product});
  }

  _sTypeFilter (event) {
    let {product} = this.state;
    product.productType = event.value;
    this.setState({product: product});
  }

  _onClose (event) {
    this.props.dispatch({type: c.SUPPLIER_EDIT_FORM_TOGGLE, payload: {editing: false, product: {}}});
  }


  render () {
    const {product,errors} = this.state;

    return (
      <Box>
        <AppHeader/>
        <Section>
          <Article align="center" pad={{horizontal: 'medium'}} primary={true}>
            <Form onSubmit={this._onSubmit}>

              <Header size="large" justify="between" pad="none">
                <Heading tag="h2" margin="none" strong={true}>{this.localeData.label_product_edit}</Heading>
                <Anchor icon={<CloseIcon />} path="/product" a11yTitle='Close Add Product Form' onClick={this._onClose.bind(this)} />
              </Header>

              <FormFields>

                <fieldset>
                  <FormField label="Product Name" error={errors[0]}>
                    <input type="text" name="name" value={product.name} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Contact Person" error={errors[0]}>
                    <input type="text" name="contactPerson" value={product.contactPerson} onChange={this._onChange.bind(this)} />
                  </FormField>
                  <FormField label="Product Type" htmlFor="sType" error={errors[0]}>
                    <Select id="sType" name="sType" options={['LOCAL','NON_LOCAL']}
                      value={product.productType}  onChange={this._sTypeFilter.bind(this)} />
                  </FormField>
                </fieldset>

                <fieldset>
                  <Box direction="row" justify="between">
                    <Heading tag="h3">Address</Heading>
                  </Box>
                  <FormField label="Street" error={errors[0]}>
                    <input type="text" name="street" value={product.address.street} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Landmark" error={errors[0]}>
                    <input type="text" name="landmark" value={product.address.landmark} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="City" error={errors[0]}>
                    <input type="text" name="city" value={product.address.city} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="State" error={errors[0]}>
                    <input type="text" name="state" value={product.address.state} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Country" error={errors[0]}>
                    <input type="text" name="country" value={product.address.country} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                  <FormField label="Pin" error={errors[0]}>
                    <input type="text" name="zip" value={product.address.zip} onChange={this._onChangeAddress.bind(this)} />
                  </FormField>
                </fieldset>

              </FormFields>

              <Footer pad={{vertical: 'medium'}}>
                <span />
                <Button type="submit" primary={true} label={this.localeData.product_edit_btn}
                  onClick={this._onSubmit.bind(this)} />
              </Footer>
            </Form>
          </Article>

        </Section>
      </Box>
      
    );
  }
}

ProductEdit.contextTypes = {
  router: PropTypes.object
};

let select = (store) => {
  return {product: store.product};
};

export default connect(select)(ProductEdit);
