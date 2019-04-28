import { InferType } from '../../../lib/mongo-ts/core/infer-type';
import { expect } from 'chai';
import { Schema } from 'mongoose';


describe('InferType Utility', function() {

    function PropDecorator() {
        return (targetPrototype: Object, propertyName: string): void => { 
            const inferredTypeCtor = InferType(targetPrototype, propertyName)
            switch (propertyName) {
                case 'name':
                    expect(inferredTypeCtor).to.be.equals(String); 
                    break;
                case 'num':
                    expect(inferredTypeCtor).to.be.equals(Number);
                    break; 
                case 'flag':
                    expect(inferredTypeCtor).to.be.equals(Boolean);
                    break;    
                case 'array':
                    expect(inferredTypeCtor).to.be.equals(Array);
                    break;                
                case 'mix':
                    expect(inferredTypeCtor).to.be.equals(Object);
                    break;
                case 'obj':
                    expect(inferredTypeCtor).to.be.equals(Object);
                    break;
                case 'objLiteral':
                    expect(inferredTypeCtor).to.be.equals(Object);

                default:
                    break;
            }
        }
    }
    function DemoClassDecorator() {
        return (target) => { }
    }

    it('Infer class primitive members types (string, number, boolean)', function() {
        @DemoClassDecorator()
        class DemoClass {
            @PropDecorator()
            name: string;
            @PropDecorator()
            num: number;
            @PropDecorator()
            flag: boolean;
        }
    })

    it('Infer class non-primitive members types (array, any, object) ', function() {
        @DemoClassDecorator()
        class DemoClass {
            @PropDecorator()
            array: string[];
            @PropDecorator()
            mix: any; // inferred as object
            @PropDecorator()
            obj: object; // inferred as object
            @PropDecorator()
            objLiteral: {}; // inferred as object
        }
    })

    it('Infer class non-primitive members types (array, any, object) ', function() {
        @DemoClassDecorator()
        class DemoClass {
            @PropDecorator()
            mySchema: Schema
        }
    })
    
})