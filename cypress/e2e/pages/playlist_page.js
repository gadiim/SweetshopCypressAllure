// cypress/e2e/pages/playlist_page.js

class PlaylistPage {
    visit() {
      cy.visit('https://vite-react-alpha-lemon.vercel.app/');
    }
  
    get searchInput() {
      return cy.contains('Search').parent().find('input[type=text]');
    }
  
    get trackList() {
      return cy.get('#tracklist > div');
    }
  
    searchTrack(trackName) {
      this.searchInput.type(trackName);
    }
  
    verifyTrackInList(trackName) {
      this.trackList.should('contain', trackName);
    }
  
    verifyTrackNotInList(trackName) {
      this.trackList.should('not.contain', trackName);
    }
  
    getTrackElement(index) {
      return cy.get(`.MuiBox-root > :nth-child(${index})`);
    }
  
    getTrackNameElement(index) {
      return cy.get(`:nth-child(${index}) > .MuiGrid-grid-xs-4 > .MuiTypography-root`);
    }
  
    getAddButton(index) {
      return cy.get(`:nth-child(${index}) > .MuiButton-root`);
    }
  
    getCheckbox(index) {
      return cy.get(`:nth-child(${index}) > .css-1wxaqej > .MuiButtonBase-root > .PrivateSwitchBase-input`);
    }
  
    addTrack(trackName, songsList) {
      for (let i = 1; i <= songsList.length; i++) { 
        this.getTrackElement(i).then($el => { 
          this.getTrackNameElement(i).then($childEl => { 
            if ($childEl.text().includes(trackName)) { 
              this.getAddButton(i).click(); 
            } 
          }); 
        }); 
      }
    }
  
    addMultipleTracks(selectedSongs, songsList) {
      selectedSongs.forEach(selectedSong => { 
        for (let i = 1; i <= songsList.length; i++) { 
          this.getTrackElement(i).then($el => { 
            this.getTrackNameElement(i).then($childEl => { 
              if ($childEl.text().includes(selectedSong)) { 
                this.getCheckbox(i).check(); 
              } 
            }); 
          }); 
        } 
      });
    }
  
    clickAddTracksButton() {
      cy.get('.MuiButton-sizeMedium').click();
    }
  
    verifyTrackInPlaylist(trackName) {
      cy.get('#playlist > .MuiBox-root > .MuiGrid-container').should('contain', trackName);
    }
  }
  
  export default PlaylistPage;
  