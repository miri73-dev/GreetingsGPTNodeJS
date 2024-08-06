async function main() {
    const projectId = 'macro-gadget-429817-h6';
    const secretId = 'OPENAI_API_KEY';
    const versionId = 'latest'; // או מספר גרסה ספציפי
  
    const secretValue = await accessSecret(projectId, secretId, versionId);
    console.log('Secret value:', secretValue);
  }
  
  main().catch(console.error);
  