import { css } from "uebersicht"

const API_KEY = "";

const image = css`
display: block;
float: left;
max-width: 1050px;
width: 100%;
height: auto;
padding: 10px 0px;
`;

const pics = css`
display: flex;
flex-direction: column;
`

const aside = css`
z-index: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
position: absolute;
top: 0px;
right: 0px;
width: 628px;
`;

const text = css`
line-height: 1.2em;
// border: 1px solid blue;
font-size: 20px;
padding: 50px;
color: white;
`;
const h1 = css`
font-size: 24px;
// border: 1px solid magenta;
`;
const h2 = css`
font-size: 22px;
// border: 1px solid magenta;
`;
const box = css`
display: flex;
align-items: center;
color: white;
font-family: "Garamond";
text-align: justify;
width: 1678px; 
height: 1020px;
`;


export const refreshFrequency = 3.6e+6; // 1 hour

export const command = () => {
    const apod_data = fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
    return apod_data;
};

export const render = ({output, error}) => {

    if (output) {
        let media;
        if (output.media_type == "video")
        {
            let req_url = output.url + "&controls=0&loop=1&autoplay=1&mute=1&disablekb=1";
            media = <iframe width="1050" height="1200" frameborder="0" src={req_url}></iframe>;
                    
        } else {
            media = <img className={image} src={output.hdurl}></img>;
        }

        return error ? (
            <div>Something went wrong: <strong>{String(error)}</strong></div>
            ) : (
            <div className={box}>
                <div className={pics}>
                    <div>
                        {media}
                    </div>
                </div>
                <aside className={aside}>
                    <h1 className={h1}>{output.title}</h1>
                    <h2 className={h2}>{output.date}</h2>
                    <p className={text}>&nbsp;&nbsp;&nbsp;&nbsp;
                    {output.explanation}
                    </p>
                </aside>
            </div>
        );
    } else {
        return (<p className={text}>No connection</p>);
    }
}

