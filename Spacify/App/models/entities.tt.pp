<#@ template debug = "false" hostspecific = "false" language = "C#v5" #>
<#@ assembly name = "$(ProjectDir)bin\$rootnamespace$.dll" #>
<#@ assembly name = "System.Core.dll" #>
<#@ import namespace = "$rootnamespace$.Models" #>
<#@ import namespace = "System" #>
<#@ import namespace = "System.Collections" #>
<#@ import namespace = "System.Collections.Generic" #>
<#@ import namespace = "System.Linq" #>
<#@ import namespace = "System.Reflection" #>
<#@ import namespace = "System.Text" #>

<#@ output extension = ".d.ts" #>
///<reference path="../../Scripts/typings/breeze/breeze.Knockout.d.ts" />
///<reference path="../../Scripts/typings/knockout/knockout.d.ts" />
///<reference path="../../Scripts/typings/breeze/breeze.d.ts" />
interface EntityBase extends breeze.Entity {
	Selected: KnockoutObservableBool;
}

interface KnockoutObservableEntityBase extends KnockoutObservableEntity {
    (): EntityBase;
    (value: EntityBase): void;

    subscribe(callback: (newValue: EntityBase) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: EntityBase, topic?: string);
}

interface KnockoutObservableEntityBaseArray extends KnockoutObservableEntityArray {
    (): EntityBase[];
    (value: EntityBase[]): void;

    subscribe(callback: (newValue: EntityBase[]) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: EntityBase[], topic?: string);
}

interface KnockoutObservableStatic {
    (value: EntityBase): KnockoutObservableEntityBase;
    new (value: EntityBase): KnockoutObservableEntityBase;
}
<#= TypeScriptConverter.GenerateTypeScriptDeclarations() #>

<#+

	public static class TypeScriptConverter
    {
        public static string GenerateTypeScriptDeclarations()
        {
            var entityBaseType = typeof(EntityBase);

            var entityTypes = entityBaseType.Assembly.GetTypes().Where(t => t.IsSubclassOf(entityBaseType));
            var builder = new StringBuilder();

            return entityTypes
                .Aggregate(builder, (sb, t) => sb.Append(GenerateTypeScriptDeclaration(t)))
                .ToString();
        }

        public static string GenerateTypeScriptDeclaration(Type modelType)
        {

            var result = new StringBuilder();

            result.AppendFormat("interface {0} ", modelType.Name);

            if (modelType.BaseType != null
                && modelType.BaseType != typeof(object))
            {
                result.AppendFormat("extends {0} ", modelType.BaseType.Name);
            }

            result.Append("{");
            result.AppendLine();

            // Only get properties that are not derived
            var declaredProperties = modelType.GetProperties(
                BindingFlags.Public |
                BindingFlags.Instance |
                BindingFlags.DeclaredOnly
                );

            if (declaredProperties.Any())
            {

                foreach (var property in declaredProperties)
                {
                    var name = Nullable.GetUnderlyingType(property.PropertyType) == null
                        ? property.Name // not nullable
                        : (property.Name + "?"); // nullable

                    var type = ConvertTypeName(property.PropertyType);

                    result.AppendFormat("    {0} : {1};", name, type);
                    result.AppendLine();
                }
            }
            else
            {
                result.AppendLine("    ___Dummy : any;");
            }
            result.Append("}");
            result.AppendLine();

            result.AppendFormat(@"
interface KnockoutObservable{0} extends KnockoutObservableEntity {{
    (): {0};
    (value: {0}): void;

    subscribe(callback: (newValue: {0}) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: {0}, topic?: string);
}}

interface KnockoutObservable{0}Array extends KnockoutObservableEntityArray {{
    (): {0}[];
    (value: {0}[]): void;

    subscribe(callback: (newValue: {0}[]) => void , target?: any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: {0}[], topic?: string);
}}

interface KnockoutObservableStatic {{
    (value: {0}): KnockoutObservable{0};
    new (value: {0}): KnockoutObservable{0};
}}
", modelType.Name);
            result.AppendLine();
            result.AppendLine();

            //return Tuple.Create(GetReferencedTypes(modelType), result.ToString());
            return result.ToString();
        }

        private static string ConvertTypeName(Type type)
        {
            var family = GetTypeFamily(type);

            if (family == TypeFamily.SystemOrEnum)
            {
                var nullableUnderlyingType = Nullable.GetUnderlyingType(type);

                // Enums are integers
                if (type.IsEnum
                    || (nullableUnderlyingType != null
                        && nullableUnderlyingType.IsEnum))
                {
                    return "KnockoutObservableNumber";
                }

                var typeMappings = new Dictionary<string, string>
                {
                    { "System.Guid", "KnockoutObservableString" },
                    { "System.Int16", "KnockoutObservableNumber" },
                    { "System.Int32", "KnockoutObservableNumber" },
                    { "System.Int64", "KnockoutObservableNumber" },
                    { "System.UInt16", "KnockoutObservableNumber" },
                    { "System.UInt32", "KnockoutObservableNumber" },
                    { "System.UInt64", "KnockoutObservableNumber" },
                    { "System.Decimal", "KnockoutObservableNumber" },
                    { "System.Single", "KnockoutObservableNumber" },
                    { "System.Double", "KnockoutObservableNumber" },
                    { "System.Char", "KnockoutObservableString" },
                    { "System.String", "KnockoutObservableString" },
                    { "System.Boolean", "KnockoutObservableBool" },
                    { "System.DateTime", "KnockoutObservableDate" }
                };

                var underlyingTypeName = type.ToString();

                // Check for nullables
                if (nullableUnderlyingType != null)
                {
                    underlyingTypeName = nullableUnderlyingType.ToString();
                }

                if (typeMappings.ContainsKey(underlyingTypeName))
                {
                    return typeMappings[underlyingTypeName];
                }

                return "any";
            }

            if (family == TypeFamily.Collection)
            {
                var elementType = type.GetGenericArguments().FirstOrDefault();

                return string.Format("KnockoutObservable{0}Array", elementType.Name);
            }

            // Single relationship to another model
            return string.Format("KnockoutObservable{0}", type.Name);
        }

        private static TypeFamily GetTypeFamily(Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            var isString = (type == typeof(string));
            var isEnumerable = typeof(IEnumerable).IsAssignableFrom(type);
            var isDictionary = type.FullName.StartsWith(typeof(IDictionary).FullName)
                || type.FullName.StartsWith(typeof(IDictionary<,>).FullName)
                || type.FullName.StartsWith(typeof(Dictionary<,>).FullName);

            if (!isString && !isDictionary && isEnumerable) return TypeFamily.Collection;

            if (type.Module.ScopeName == "CommonLanguageRuntimeLibrary" || type.IsEnum) return TypeFamily.SystemOrEnum;

            // Fallback when type is not recognised.
            return TypeFamily.Model;
        }

        private enum TypeFamily
        {
            SystemOrEnum,
            Model,
            Collection
        }
    }

#>