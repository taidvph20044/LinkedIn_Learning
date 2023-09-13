import './HomePage.css'
import { useGetProductsQuery } from "@/api/courses";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
    const { data: productsData, isLoading: isProductLoading } = useGetProductsQuery();

    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Hiển thị 4 sản phẩm trên mỗi dòng
        slidesToScroll: 1,
    };

    return (
        <div className='homepage containerCss'>
            <div className="height-banner">
                <div className="banner">
                    <h2 className='text-3xl'>Xế, grow your skills and advance your career with LinkedIn Learning</h2>
                    <div className="fl-milion">
                        <span className='flex gap-1'><img src="https://static.licdn.com/aero-v1/sc/h/8le3lme5t31ikkcrqzon06b5x" alt="" /><img src="https://static.licdn.com/aero-v1/sc/h/9kb0uzaajhypnqmj6ucmdlrfe" alt="" /></span>
                        <span>Millions of members are on LinkedIn Learning</span>
                    </div>
                    <div className="fl-button">
                        <button className='Startmyfreemonth'>Start my free month</button>
                        <button className='Buyformyteam'>Buy for my team</button>
                    </div>
                </div>
                <div className="bannerBosu">
                    <div className="bannerImg">
                        <img src="https://static.licdn.com/aero-v1/sc/h/cch95u9n3wpbme2zzh5n4uwg0" alt="" />
                    </div>
                </div>
            </div>

            <div className='Recommended-hp'>
                <div className='rcm-1'>
                    <img src="https://f10-zpcloud.zdn.vn/5816977808189187612/c8dfdd3f757aa724fe6b.jpg" alt="" />
                </div>
                <div className='rcm-2'>
                    <div className="rcm2-1">Recommended</div>
                    <div className="rcm2-2">Xế, advance your career with personalized learning</div>
                    <div className="rcm2-3">Get custom skill and course recommendations based on your goals. Your response is private to you.</div>
                </div>
                <div className='rcm-3'>
                    <button>Get started</button>
                </div>
            </div>

            <div>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Top picks for Xế</h2>

                        <div className="product-slider">
                            {isProductLoading ? (
                                // Show loading state
                                <div>Loading...</div>
                            ) : (
                                <Slider {...settings}>
                                    {productsData?.map((product, index) => (
                                        <div key={index} className="group relative">
                                            <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                <img src={product.imageurl} alt="" />
                                            </div>
                                            <div className="mt-2">
                                                <div>
                                                    <h3 className="text-xs text-gray-700">


                                                        <Link to={`/introduction/${product.id}`}>
                                                            <span className="absolute inset-2 popular">POPULAR</span>
                                                            {product.category}
                                                        </Link>
                                                    </h3>
                                                    <p className="mt-1 text-base">{product.title}</p>
                                                </div>
                                                <p className=" mt-1 text-xs text-gray">{product.instructor}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">This week’s top courses</h2>

                        <div className="product-slider">
                            {isProductLoading ? (
                                // Show loading state
                                <div>Loading...</div>
                            ) : (
                                <Slider {...settings}>
                                    {productsData?.map((product, index) => (
                                        <div key={index} className="group relative">
                                            <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                <img src={product.imageurl} alt="" />
                                            </div>
                                            <div className="mt-2">
                                                <div>
                                                    <h3 className="text-xs text-gray-700">


                                                        <Link to={`/introduction/${product.id}`}>
                                                            <span className="absolute inset-2 popular">POPULAR</span>
                                                            {product.category}
                                                        </Link>
                                                    </h3>
                                                    <p className="mt-1 text-base">{product.title}</p>
                                                </div>
                                                <p className=" mt-1 text-xs text-gray">{product.instructor}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-20' />
            {/* End */}
        </div>
    )

};

export default Homepage;