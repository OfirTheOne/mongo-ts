import { Ctor } from "../models/internal";

type Metadata = { [key: string]: any }

export class MetadataAgent {

    static set<T extends Ctor | Object>(classObject: T, [path, value]: [string, any]): void {
        const original = classObject;
        const proto = this.getPrototype(original); 
        const metadata = proto['$metadata'] || {};
        setValueUsingNestedPath(metadata, path, value);
        proto['$metadata'] = metadata;
    }

    static has<T extends Ctor | Object>(classObject: T, path: string): boolean {
        const original = classObject;
        const proto = this.getPrototype(original); 
        const metadata = proto['$metadata'] || {};
        return hasValueUsingNestedPath(metadata, path);
    }

    static assign<T extends Ctor | Object>(classObject: T, [path, value]: [string, any]): void {
        const original = classObject;
        const proto = this.getPrototype(original); 
        const metadata = proto['$metadata'] || {};
        assignValueUsingNestedPath(metadata, path, value);
        proto['$metadata'] = metadata;
    }

    static getMeta<T extends Ctor | Object>(classObject: T): Metadata {
        const original = classObject;
        const proto = this.getPrototype(original); 
        const metadata = proto['$metadata'];
        return metadata;
    }


    private static getPrototype(classObject: any) {
        if(classObject.prototype == undefined) { return classObject; }
        const proto = classObject.prototype;
        return proto;
    }
}


function hasValueUsingNestedPath(obj: object, path: string): boolean {
    const splitPath = path.split('.');
    let target = obj;
    if(!obj || splitPath.length == 0) { return false; }

    for (let i = 0; i < splitPath.length; i++) {
        const slice = splitPath[i];
        try {
            target = target[slice]; 
            if(target == undefined || target == null) {
                return false;
            }
        } catch (error) {
            return false;            
        }
    }
    return true;

}


function setValueUsingNestedPath(obj: object, path: string, value: any) {
    const splitPath = path.split('.');
    if(splitPath.length == 1) {
        obj[splitPath[0]] = value;
    } else if(splitPath.length > 1) {
        /*
        let valueParentObj = obj;
        for (let i = 0; i < splitPath.length-1; i++) {
            const slice = splitPath[i];
            try {
                let currentLevel = valueParentObj[slice]; 
                if(currentLevel == undefined || currentLevel == null) {
                    valueParentObj[slice] = {};
                } else if(typeof currentLevel != 'object') {
                    return false;
                }
                valueParentObj = valueParentObj[slice];
            } catch (error) {
                return false;                
            }
        }
        */
        const valueParentObj = digAndBuildPath(obj, splitPath);
        if(!valueParentObj) {
            return false;
        }
        valueParentObj[splitPath[splitPath.length-1]] = value; 
        return true;
    }
}


function assignValueUsingNestedPath(obj: object, path: string, value: any) {
    const splitPath = path.split('.');
    if(splitPath.length == 1) {
        obj[splitPath[0]] = value;
    } else if(splitPath.length > 1) {
        /*
        let valueParentObj = obj;
        for (let i = 0; i < splitPath.length-1; i++) {
            const slice = splitPath[i];
            try {
                let currentLevel = valueParentObj[slice]; 
                if(currentLevel == undefined || currentLevel == null) {
                    valueParentObj[slice] = {};
                } else if(typeof currentLevel != 'object') {
                    return false;
                }
                valueParentObj = valueParentObj[slice];
            } catch (error) {
                return false;                
            }
        }
        */
        const valueParentObj = digAndBuildPath(obj, splitPath);
        if(!valueParentObj) {
            return false;
        }

        if(typeof value == 'object') {
            const existingValue = valueParentObj[splitPath[splitPath.length-1]] || {};
            valueParentObj[splitPath[splitPath.length-1]] = { ...existingValue, ...value};
        } else {
            valueParentObj[splitPath[splitPath.length-1]] = value;
        }
        return true;
    }
}

function digAndBuildPath(obj: object, splitPath: Array<string>): (object | undefined) {
    let valueParentObj = obj;
    for (let i = 0; i < splitPath.length-1; i++) {
        const slice = splitPath[i];
        try {
            let currentLevel = valueParentObj[slice]; 
            if(currentLevel == undefined || currentLevel == null) {
                valueParentObj[slice] = {};
            } else if(typeof currentLevel != 'object') {
                return;
            }
            valueParentObj = valueParentObj[slice];
        } catch (error) {
            return;                
        }
    }
    return valueParentObj;
}