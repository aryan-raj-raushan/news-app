import React, { useState, useEffect } from "react";
// import Alert from "./Alert";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  // document.title = `News24 - ${this.capitalize(props.category)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     isLoading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };
  // }`;
  // this.handlePrevClick = this.handlePrevClick.bind(this);
  // this.handleNextClick = this.handleNextClick.bind(this);
  // console.log(this.state.page);
  // }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setIsLoading(true);
    // this.setState({ isLoading: true });
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    // console.log(parseData);
    props.setProgress(70);
    setArticles(parseData.articles);
    setIsLoading(false);
    setTotalResults(parseData.totalResults);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   isLoading: false,
    //   page: this.state.page,
    // });
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async componentDidMount() {
  //   // console.log("cdm");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=73e1c88f01c940028c163864fc9288a9&page=${this.state.page}&pageSize=${props.pageSize}`;
  //   // this.setState({ isLoading: true });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // // console.log(parseData);
  //   // this.setState({
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   //   isLoading: false,
  //   // });
  //   // // console.log(this.state.totalResults);
  //   // // console.log(this.state.articles);
  //   this.updateNews();
  // }

  // handlePrevClick = async () => {
  //   // console.log("Previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=73e1c88f01c940028c163864fc9288a9&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // this.setState({ isLoading: true });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // // console.log(parseData);
  //   // this.setState((prevState) => ({
  //   //   page: prevState.page - 1,
  //   //   articles: parseData.articles,
  //   //   isLoading: false,
  //   // }));
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   // console.log("Next");
  //   // console.log(this.state.totalResults);
  //   // if (
  //   //   this.state.page + 1 >
  //   //   Math.ceil(this.state.totalResults / props.pageSize)
  //   // ) {
  //   //   alert("There is no other news to displayed!!!");
  //   //   // <Alert />;
  //   // } else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     props.country
  //   //   }&category=${
  //   //     props.category
  //   //   }&apiKey=73e1c88f01c940028c163864fc9288a9&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   this.setState({ isLoading: true });
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   // console.log(parseData);
  //   //   this.setState((nextState) => ({
  //   //     page: nextState.page + 1,
  //   //     articles: parseData.articles,
  //   //     isLoading: false,
  //   //   }));
  //   // }
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    // this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // this.setState({ isLoading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setIsLoading(false);
    // this.setState({
    //   articles: this.state.articles.concat(parseData.articles),
    //   totalResults: parseData.totalResults,
    //   isLoading: false,
    // });
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "70px 0 20px 0" }}>
        News24 - Top {capitalize(props.category)} Headlines
      </h1>
      {isLoading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            onClick={this.handleNextClick}
            type="button"
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
