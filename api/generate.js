export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const prompt=req.body?.prompt;
  if(!prompt) return res.status(400).json({error:"Prompt gerekli"});
  const key=process.env.GEMINI_API_KEY;
  if(!key) return res.status(200).json({text:"Demo modu aktif. GEMINI_API_KEY Vercel ortam değişkenine eklendiğinde gerçek AI üretimi başlayacak. Fikriniz: "+prompt});
  try{
    const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key="+encodeURIComponent(key),{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:"Sen Güzel AI kreatif direktörüsün. Türkçe, premium ve uygulanabilir bir reklam kampanyası üret. Kullanıcı fikri: "+prompt}]}]})
    });
    const data=await r.json();
    const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("\n") || data?.error?.message || "Yanıt üretilemedi.";
    return res.status(r.ok?200:500).json({text});
  }catch(e){return res.status(500).json({error:e.message})}
}