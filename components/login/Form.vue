<template>
  <VStack
    justifyContent="flex-start"
    alignItems="flex-start"
  >
    <HStack
      fontSize="14px"
      fontWeight="500"
    >
      <Box color="var(--black)"> New user? </Box>
      <StyledLink href="#"> Create an account. </StyledLink>
    </HStack>
    <form>
      <VStack
        gap="24px"
        as="form"
        mt="16px"
        alignItems="flex-start"
      >
        {{ isValid }}
        <Box
          v-if="!isValid"
          as="ul"
          backgroundColor="pink.100"
          color="red"
          p="4"
          listStyleType="disc"
          listStylePosition="inside"
          borderRadius="10px"
        >
          {{ errors }}
          There were some errors:
          <li
            v-for="error in errors"
            :key="error"
          >
            {{ error }}
          </li>
        </Box>
        <FormInputWithLabel
          v-model="username"
          fieldName="username"
          labelText="Username"
        />
        {{ username }}
        <FormInputWithLabel
          v-model="password"
          fieldName="password"
          labelText="Password"
          inputType="password"
        />
        {{ password }}
        <PrimaryButton
          type="submit"
          text="Continue"
          @action="handleSubmit"
        />
        <StyledLink href="/forgot-password">Forgot password?</StyledLink>
      </VStack>
    </form>
  </VStack>
</template>

<script lang="ts" setup>
  import { Box, HStack, VStack } from "styled-system/jsx";
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const errors: string[] = [];
  let isValid = true;

  function handleSubmit() {
    console.log("Called handleSubmit");
    errors.length = 0;
    if (username.value === "") {
      errors.push("Username is required");
    }
    if (password.value === "") {
      errors.push("Password is required");
    }
    isValid = username.value !== "" && password.value !== "";
    if (isValid) {
      username.value = "";
      password.value = "";
      router.push("/");
    }
  }
</script>

<style></style>
