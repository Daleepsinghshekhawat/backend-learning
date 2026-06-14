import { Link } from "react-router-dom";

const  Header =()=> {
  return (
    <div>
      <Link to="/">Home </Link>

      <Link to="/viewbybrand"> Viewbybrand </Link>
      <Link to="/viewbyid">viewbyid </Link>
      <Link to="/viewbyname">viewbyname </Link>
      <Link to="/viewbycategory">viewbycategory </Link>
<br/>
      <Link to="/newproductbrand">Newproductbrand </Link>
      <Link to="/discountcategory">Discountcategory </Link>
      <Link to="/categorybrand">Categorybrand </Link>
      <Link to="/istockbrand<">Instockbrand </Link>
      <Link to="/ratingdiscount">Ratingdiscount </Link>
<br/>
      <Link to="/form">form </Link>
      <Link to="/users">Users </Link>
      <Link to="/userinfo">Userinfo </Link>
      <Link to="/updateusers">updateusers </Link>
      <Link to="/deleteuser">deleteuser </Link>
<br/>


      <Link to="/bmi">Bmi </Link>
      <Link to="/activeusers">ActiveUsers </Link>
      <Link to="/viewbmi">ViewBmi </Link>
      <Link to="/modify">Modify </Link>
      <Link to="/deleteduserbmi">Deleteduserbmi </Link>
      
    </div>
  );
}

export default Header;
