export default function handler(req,res){
  res.status(200).json({
    status:"ok",
    service:"guzelai",
    time:new Date().toISOString(),
    ai:{
      platformAiConfigured:Boolean(process.env.GEMINI_API_KEY),
      byokEncryptionReady:Boolean(process.env.AI_KEY_ENCRYPTION_SECRET||process.env.GEMINI_API_KEY),
      googleLoginConfigured:Boolean(process.env.GOOGLE_CLIENT_ID||process.env.VITE_GOOGLE_CLIENT_ID),
      models:{
        text:process.env.GEMINI_TEXT_MODEL||"gemini-3.6-flash",
        image:process.env.GEMINI_IMAGE_MODEL||"gemini-3.1-flash-image",
        video:process.env.VEO_MODEL||"veo-3.1-generate-preview"
      }
    }
  });
}
