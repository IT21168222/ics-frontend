import Category from "./components/admin/category/Category";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import Product from "./components/admin/product/Product";
import Section from "./components/admin/section/Section";
import SubCategory from "./components/admin/subCategory/SubCategory";
import Supplier from "./components/admin/supplier/Supplier";
import SupplierAdd from "./components/admin/supplier/SupplierAdd";
import SupplierEdit from "./components/admin/supplier/SupplierEdit";
import User from "./components/admin/user/User";
import Test from "./components/Test";

export default {
  path: '/',
  component: Main,
  indexRoute: {component: Dashboard},
  childRoutes: [
    { path: 'category', component: Category},
    { path: 'product', component: Product},
    { path: 'section', component: Section},
    { path: 'subCategory', component: SubCategory},
    { path: 'supplier', component: Supplier},
    { path: 'supplier/add', component: SupplierAdd},
    { path: 'supplier/edit', component: SupplierEdit},
    { path: 'user', component: User},
    { path: 'test', component: Test}
  ]
};
