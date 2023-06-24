import React, { useState } from "react";
import Card from "./card/Card.js";
import { movieData as _movieExported } from "./MovieList";
import Header from "./Header/Header";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./MovieDailog/MovieDailog";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({ palette: { type: "dark" } });

let masterCopy = [..._movieExported]; //MASTER MOVIE DATA
// ==== FUNCTION COMPONENT
const App = () => {

  // Setting state
  const [movie, setMovie] = useState(_movieExported);   //INITALIZE MOVIE DATA
  const [selectedData, setSelectedData] = useState({}); //INITALIZE DAILOG BOX MOVIE DATA
  const [searchText, setSearchText] = useState("");     //INITALIZE SEARCH DATA
  const [open, setOpen] = React.useState(false);        //INITALIZE OPEN AND CLOSE DAILOG 
  
  const includeColumns = ["title"];                     //Exclude column list from filter
  const sort = "asc";                                   //INITALIZE SORT OF MOVIE LIST

 //ADD MOVIE FUNCTION WHEN SUBMIT BUTTON IS CLICKED FROM THE DIALOG JS
   const addMovie = (movieData) => {
    movieData.id = movie.length + 1;
   	setMovie([...movie, movieData]);
    setOpen(false);
    masterCopy.push(movieData);
     };
   
  //DELETE MOVIE FUNCTION FROM THE CARD JS
   const deleteMovie = (id) => {
     let deleteValue = movie.filter((a) => a.id !== id)   //FILTER OUT THE DELETED ELEMENT FORM THE LIST ==== # TODO # filter()
     masterCopy = deleteValue;
     setMovie(deleteValue);
   };
   
  //UPDATE MOVIE FUNCTION FROM THE CARD JS
   const updateUser = (editMovie) => {
    let editValue = movie.map(movieList => (movieList.id == editMovie.id ? editMovie : movieList))  //EDIT AND UPDATE RETURN LIST ==== # TODO # map()
    masterCopy = editValue;
    setMovie(editValue);
   	setOpen(false);	
   	}

  // SEARCH FUNCTION FROM THE HEADER JS
  const handleChange = (data) => {
    const lowercasedValue = data.target.value.toLowerCase().trim(); // ==== # TODO # toLowerCase() , trim()
    setSearchText(lowercasedValue);                   // STATE UPDATATION
    if (lowercasedValue === "") {                     // IF VALUE EMPTY
      setMovie(masterCopy);                                // SHOW ALL MOVIE
      return;
    }
                                                      // ELSE VALUE IS SEARCHED
    const filteredMovie = masterCopy.filter(moviename => {
      return Object.keys(moviename).some(key =>
        includeColumns.includes(key) ?  moviename[key].toString().toLowerCase().includes(lowercasedValue) : false
      );
    });
    setMovie(filteredMovie);                            // SET SEARCHED MOVIE
  };
  
  //INITALIZE SORT
  const sorted = movie.sort((a, b) => {                  // ==== # TODO # sort()
	const isRevesed = sort === "asc" ? 1 : -1;
		return isRevesed * a.title.localeCompare(b.title);   // SORT MOVIE // ==== # TODO # localeCompare()
  });

 
  //ADD DIALOG BY SETTING THE INITAL FORM VALUE
  const handleClickOpen = () => {
      setSelectedData({
        id: null,
        title: "",
        year: "",
        duration: "",
        storyline: "",
      });
    setOpen(true);
  };

   //EDIT DIALOG BY SETTING MOVIE VALUE THE SELECTED VALUE BY ID 
  const editModel = (id)=>{
	let movieDetails= movie.find((data) => data.id == id)   // ==== # TODO # sort()
	  setSelectedData(movieDetails);
	  setOpen(true);
  }

  //DIALOG CLOSE
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <MuiThemeProvider theme={theme}>
    <div>
      <Header
        onChange={handleChange}
        value={searchText}
      />
      <FormDialog
        openDailog={open}
        handleClose={handleClose}
        addMovie={addMovie}
        initialFormState={selectedData}
		    updateUser={updateUser}
      ></FormDialog>

      <div>
        {sorted.map((a, b) => (
          <Card
            key={b}
            id={a.id}
            movieName={a.title}
            year={a.year}
            genres={a.genres?a.genres:null}
            duration={a.duration?a.duration:'PT119M'}
            contentRating={a.contentRating?a.contentRating:'R'}
            description={a.storyline}
            imdbRating={a.imdbRating}
            actors={a.actors}
            movieImage={a.posterurl?a.posterurl:'https://lh3.googleusercontent.com/proxy/9LxDOxNYopQz6d33m3qoHAKZqSj7uULSgcjPGL4vIdGh2WiXQvJ232x7COpz9FMbpHfnaQKYlgcVd55JjIlSsBUc_AoKRIoCkl2V4BeLV8FPRMCCu3ebKCh12SOhq01n9Yrz'}
            deleteMovie={deleteMovie}
			      editDialog={editModel}
          />
        ))}
      </div>

      {/* ADD BUTTON */}
      <div className="fabPosition">
        <Fab
          color="primary"
          onClick={handleClickOpen}
          initialFormState={selectedData}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
      
    </div>
    </MuiThemeProvider>
  );
};

export default App;
