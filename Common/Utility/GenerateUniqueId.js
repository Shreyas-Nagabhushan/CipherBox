const { v4: uuidv4 } = require('uuid');

export function generateUniqueId(length) 
{
    return uuidv4().replace(/-/g, '').slice(0, length);
}

