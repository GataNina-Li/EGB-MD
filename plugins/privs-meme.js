import hispamemes from 'hispamemes'
let handler = async (m, {command, conn}) => {
const url = await hispamemes.meme();
conn.sendFile("120363160031023229@newsletter", url, 'error.jpg', ``, m, null, fake);    
}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(testmemes)$/i
export default handler
