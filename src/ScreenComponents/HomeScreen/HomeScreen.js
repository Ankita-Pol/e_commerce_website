import DashboardScreen from "../DashboardScreen/DashboardScreen";
import {BestSellerScreen} from "../BestSellerScreen";
import CategoryScreen from "../CategoryScreen/CategoryScreen";

const HomeScreen =()=>{
    return(
        <div>
         
            <DashboardScreen/>
            <BestSellerScreen/>
            <CategoryScreen/>
        </div>
    )
}
export default HomeScreen;
