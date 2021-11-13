
    function fetchJSONData() 
    { 
        var output= '';
        var data = document.getElementById("inputdata").value;
        // console.log(data);
        var xmlhttp = new XMLHttpRequest(); 
        var url = "https://api.lyrics.ovh/suggest/"+data; 
        xmlhttp.onreadystatechange = function () 
        { 
            if (this.readyState == 4 && this.status == 200) 
            { 
                output += '<table border = 0px style=\'border-collapse:collapse\'><tr><td></td><td></td></tr>'; 
                var response = JSON.parse(this.responseText); 
                console.log(response);
                 
                
                if(response.total < 15)
                {
                    for (let i = 0; i < response.total; i++) 
                    {
                        var song = response.data[i].title;
                        var pic = response.data[i].artist.picture_small;
                        var lyrics = 'https://api.lyrics.ovh/v1/'+response.data[i].artist.name+'/'+song;
                        output += '<tr><td><img src=\''+pic+'\'></td><td>'+song+'</td><td><button onclick=\"getlyrics(\''+lyrics+'\')\">Get lyrics</button></td></tr>';
                    }
                }
                else
                {
                    for (let i = 0; i < 15; i++) 
                    {
                        var song = response.data[i].title;
                        var pic = response.data[i].artist.picture_small;
                        var lyrics = 'https://api.lyrics.ovh/v1/'+response.data[i].artist.name+'/'+song;
                        // console.log(lyrics);
                        output += '<tr><td><img src=\''+pic+'\'></td><td>'+song+'</td><td><button onclick=\"getlyrics(\''+lyrics+'\')\">Get lyrics</button></td></tr>';
                        
                    }
                }
                output += '</table>'; 
                console.log(output);
                document.getElementById("result").innerHTML = output;
                document.getElementById("next").value = response.next;
                document.getElementById("prev").value = response.prev;
            } 
        }; 
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } 
    
    function getlyrics(x)
    {
        var xmlhttp = new XMLHttpRequest(); 
        // console.log(x);
        var url = x; 
        xmlhttp.onreadystatechange = function() 
        { 
            var resp = JSON.parse(this.responseText);
            if(resp.lyrics)
            {
                document.getElementById("result").innerHTML = resp.lyrics
            }
            else
            {
                document.getElementById("result").innerHTML = resp.error;
                return;
            }
    
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    
    // function manupulate(x) 
    // { 
    //     document.getElementById("result").innerHTML = 'Fetching for '+x+'..!';
    //     var output= '';
    //     var link = document.getElementById("next").value;
    //     var xmlhttp = new XMLHttpRequest(); 
    //     var url = link; 
    //         xmlhttp.onreadystatechange = function () 
    //     { 
    //         if (this.readyState == 4 && this.status == 200) 
    //         { 
    //             output += '<table border = 1><tr><td>IMAGE</td><td>SONG</td></tr>'; 
    //             var response = JSON.parse(this.responseText); 
    //             console.log(response) 
    
    //             for (let i = 0; i < response.total; i++) 
    //             {
    //                 if(i==15)
    //                 {
    //                     output += '</table>'; 
    //                     console.log(output);
    //                     document.getElementById("result").innerHTML = output;
    //                     document.getElementById("next").value = response.next;
    //                     document.getElementById("prev").value = response.prev;
    //                     return;
    //                 }
    //                 var song = response.data[i].title;
    //                 var pic = response.data[i].artist.picture_small;
    //                 output += '<tr><td><img src=\''+pic+'\'></td><td>'+song+'</td><td><input type="button" value="get lyrics"></td></tr>';
    //             }
    //         } 
    //     }; 
    //     xmlhttp.open("GET", url, true);
    //     xmlhttp.send();
    // } 
    
    