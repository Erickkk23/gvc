function change(amount)
    if math.type(amount) ~= "integer" then
      error("Amount must be an integer")
    end
    if amount < 0 then
      error("Amount cannot be negative")
    end
    local counts, remaining = {}, amount
    for _, denomination in ipairs({25, 10, 5, 1}) do
      counts[denomination] = remaining // denomination
      remaining = remaining % denomination
    end
    return counts
  end
  
  -- Write your first then lower case function here
  function first_then_lower_case(strings, predicate)
    for index, str in ipairs(strings) do
      if predicate(str) then
        return string.lower(str)
      end
    end
    return nil
  end
  
  -- Write your powers generator here
  function powers_generator(base, limit)
    local value = 1
    local exponent = 0
        while value <= limit do
            coroutine.yield(value)
            exponent = exponent + 1
            value = base ^ exponent
        end
    end
  -- Write your say function here
  
  -- Write your line count function here
  function meaningful_line_count(file)
    local count = 0
    local f, err = io.open(file, "r")
    if not f then
      error("File not found: " .. err)
    end
    for line in f:lines() do
      local trimmed_line = line:match("^%s*(.-)%s*$") -- lloks funky but removes whitespace
      if trimmed_line ~= "" and trimmed_line:sub(1,1) ~= "#" then -- checks first char of first line
        count = count + 1
      end
    end
    f:close()
    return count
  end
  
  -- Write your Quaternion table here
  Quaternion = (function(class)
    class.new = function(a, b, c, d)
        local self = setmetatable({}, class)
        self.a = a or 0
        self.b = b or 0
        self.c = c or 0
        self.d = d or 0
        return self
    end

    -- String representation
    function class:__tostring()
        return string.format("%d%+di%+dj%+dk", self.a, self.b, self.c, self.d)
    end

    -- Add two quaternions
    function class.__add(q1, q2)
        return class.new(q1.a + q2.a, q1.b + q2.b, q1.c + q2.c, q1.d + q2.d)
    end

    -- Multiply two quaternions
    function class.__mul(q1, q2)
        return class.new(
            q1.a * q2.a - q1.b * q2.b - q1.c * q2.c - q1.d * q2.d,
            q1.a * q2.b + q1.b * q2.a + q1.c * q2.d - q1.d * q2.c,
            q1.a * q2.c - q1.b * q2.d + q1.c * q2.a + q1.d * q2.b,
            q1.a * q2.d + q1.b * q2.c - q1.c * q2.b + q1.d * q2.a
        )
    end

    -- Conjugate of quaternion
    function class:conjugate()
        return class.new(self.a, -self.b, -self.c, -self.d)
    end

    -- Coefficients list
    function class:coefficients()
        return {self.a, self.b, self.c, self.d}
    end

    -- Equality check
    function class.__eq(q1, q2)
        return q1.a == q2.a and q1.b == q2.b and q1.c == q2.c and q1.d == q2.d
    end

    return class
end)({})