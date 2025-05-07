namespace KARacter.YouNeed.Domain.Common
{
public abstract class ValueObject
{
    protected static bool EqualOperator(ValueObject left, ValueObject right)
    {
        if (ReferenceEquals(left, null) ^ ReferenceEquals(right, null))
        {
            return false;
        }
        return ReferenceEquals(left, right) || left.Equals(right);
    }

    protected static bool NotEqualOperator(ValueObject left, ValueObject right)
    {
        return !(EqualOperator(left, right));
    }

    protected abstract IEnumerable<object> GetEqualityComponents();

    public override bool Equals(object obj)
    {
        if (obj == null || obj.GetType() != GetType())
        {
            return false;
        }

        var other = (ValueObject)obj;

        return this.GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
    }

    public static bool operator ==(ValueObject left, ValueObject right)
    {
        return EqualOperator(left, right);
    }

    public static bool operator !=(ValueObject left, ValueObject right)
    {
        return NotEqualOperator(left, right);
    }

    // Dodanie metody do kopiowania
    protected abstract ValueObject Clone();

    // Dodanie metody do porównywania z innym ValueObject
    public int CompareTo(ValueObject other)
    {
        if (other == null)
            return 1;

        var components = GetEqualityComponents().ToArray();
        var otherComponents = other.GetEqualityComponents().ToArray();

        for (var i = 0; i < components.Length; i++)
        {
            if (components[i] is IComparable comparable && otherComponents[i] is IComparable otherComparable)
            {
                var comparison = comparable.CompareTo(otherComparable);
                if (comparison != 0)
                    return comparison;
            }
        }

        return 0;
    }

    // Dodanie metody do tworzenia tekstowej reprezentacji obiektu
    public override string ToString()
    {
        return $"{GetType().Name} [" +
               string.Join(", ", GetEqualityComponents().Select(x => x?.ToString() ?? "null")) +
               "]";
    }

    // Ulepszenie metody GetHashCode dla lepszej wydajności
    public override int GetHashCode()
    {
        unchecked
        {
            var hash = 17;
            foreach (var component in GetEqualityComponents())
            {
                hash = hash * 23 + (component?.GetHashCode() ?? 0);
            }
            return hash;
        }
        }
    }
}
